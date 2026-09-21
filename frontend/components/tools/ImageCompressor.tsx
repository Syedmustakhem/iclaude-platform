"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type CompressionResult = {
  originalFile: File;
  compressedBlob: Blob;
  compressedUrl: string;
  originalSize: number;
  compressedSize: number;
  reduction: number;
};

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const value = bytes / 1024 ** index;

  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function getOutputType(file: File): "image/jpeg" | "image/webp" {
  if (file.type === "image/webp") {
    return "image/webp";
  }

  return "image/jpeg";
}

function getOutputExtension(
  type: "image/jpeg" | "image/webp",
): string {
  return type === "image/webp" ? "webp" : "jpg";
}

function getOutputName(file: File, extension: string): string {
  const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

  return `${nameWithoutExtension}-compressed.${extension}`;
}

export default function ImageCompressor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [quality, setQuality] = useState(0.7);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CompressionResult | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      if (result?.compressedUrl) {
        URL.revokeObjectURL(result.compressedUrl);
      }
    };
  }, [result]);

  function clearResult() {
    if (result?.compressedUrl) {
      URL.revokeObjectURL(result.compressedUrl);
    }

    setResult(null);
  }

  function handleFile(selectedFile: File) {
    setError("");
    clearResult();

    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setError(
        "Please select a JPG, JPEG, PNG, or WebP image.",
      );
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("The maximum supported file size is 50 MB.");
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const url = URL.createObjectURL(selectedFile);

    objectUrlRef.current = url;

    setFile(selectedFile);
    setPreviewUrl(url);
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }

    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  }

  async function compressImage() {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setError("");
    setIsCompressing(true);

    try {
      const image = new Image();

      const imageUrl = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("Unable to read the image."));
        image.src = imageUrl;
      });

      URL.revokeObjectURL(imageUrl);

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Your browser does not support image compression.",
        );
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
      );

      const outputType = getOutputType(file);

      const compressedBlob = await new Promise<Blob | null>(
        (resolve) => {
          canvas.toBlob(
            resolve,
            outputType,
            quality,
          );
        },
      );

      if (!compressedBlob) {
        throw new Error(
          "The image could not be compressed.",
        );
      }

      const compressedUrl =
        URL.createObjectURL(compressedBlob);

      const reduction = Math.max(
        0,
        ((file.size - compressedBlob.size) / file.size) *
          100,
      );

      setResult({
        originalFile: file,
        compressedBlob,
        compressedUrl,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        reduction,
      });
    } catch (compressionError) {
      console.error(compressionError);

      setError(
        "Something went wrong while compressing the image. Please try another image.",
      );
    } finally {
      setIsCompressing(false);
    }
  }

  function downloadResult() {
    if (!result) return;

    const extension = getOutputExtension(
      result.compressedBlob.type as
        | "image/jpeg"
        | "image/webp",
    );

    const link = document.createElement("a");

    link.href = result.compressedUrl;
    link.download = getOutputName(
      result.originalFile,
      extension,
    );

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function reset() {
    clearResult();

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setFile(null);
    setPreviewUrl("");
    setError("");
    setQuality(0.7);
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Choose an image to compress"
      />

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          className={[
            "group relative flex min-h-[300px] cursor-pointer",
            "items-center justify-center overflow-hidden rounded-3xl",
            "border-2 border-dashed px-6 py-10 text-center",
            "transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-4",
            "focus-visible:ring-blue-100",
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/40 blur-3xl transition-transform duration-500 group-hover:scale-125"
          />

          <div className="relative z-10 flex max-w-lg flex-col items-center">
            <div
              className={[
                "flex h-16 w-16 items-center justify-center",
                "rounded-2xl border shadow-sm transition-all",
                isDragging
                  ? "border-blue-500 bg-blue-600 text-white scale-110"
                  : "border-blue-100 bg-white text-blue-600 group-hover:-translate-y-1 group-hover:scale-105",
              ].join(" ")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0 4 4m-4-4L8 8"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13v4.5A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5V13"
                />
              </svg>
            </div>

            <span className="mt-5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {isDragging
                ? "Release to upload"
                : "Private browser processing"}
            </span>

            <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
              {isDragging
                ? "Drop your image here"
                : "Upload an image"}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Drag and drop your image here, or choose
              one from your device.
            </p>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
            >
              Choose image
            </button>

            <p className="mt-4 text-xs text-slate-500">
              JPG, PNG, WebP • Maximum 50 MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <div className="flex min-h-[300px] items-center justify-center p-4 sm:min-h-[420px]">
                <img
                  src={previewUrl}
                  alt={`Preview of ${file.name}`}
                  className="max-h-[420px] max-w-full rounded-2xl object-contain shadow-sm"
                />
              </div>

              <div className="border-t border-slate-200 bg-white px-5 py-4">
                <p className="truncate text-sm font-bold text-slate-900">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Original size: {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Compression
              </p>

              <h3 className="mt-2 text-xl font-black text-slate-950">
                Choose quality
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Higher quality keeps more detail but creates a
                larger file.
              </p>

              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Quality
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {Math.round(quality * 100)}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                    clearResult();
                  }}
                  className="mt-5 w-full accent-blue-600"
                  aria-label="Compression quality"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>Smaller file</span>
                  <span>Higher quality</span>
                </div>
              </div>

              <button
                type="button"
                onClick={compressImage}
                disabled={isCompressing}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCompressing ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Compressing...
                  </>
                ) : (
                  "Compress image"
                )}
              </button>

              <button
                type="button"
                onClick={reset}
                className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Choose another image
              </button>
            </div>
          </div>

          {result && (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                    Compression complete
                  </p>

                  <h3 className="mt-2 text-xl font-black text-slate-950">
                    Your image is ready
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      Original:{" "}
                      {formatFileSize(result.originalSize)}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      Compressed:{" "}
                      {formatFileSize(result.compressedSize)}
                    </span>

                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      {result.reduction.toFixed(1)}% smaller
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={downloadResult}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v11m0 0 4-4m-4 4-4-4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 20h14"
                    />
                  </svg>
                  Download
                </button>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-white">
                <img
                  src={result.compressedUrl}
                  alt="Compressed image preview"
                  className="mx-auto max-h-[360px] max-w-full object-contain"
                />
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
            >
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold"
              >
                !
              </span>

              <p className="pt-0.5 leading-6">{error}</p>
            </div>
          )}

          <p className="text-center text-xs leading-5 text-slate-500">
            Images are processed locally in your browser. The
            selected image is not uploaded to the iclaude server.
          </p>
        </div>
      )}
    </div>
  );
}