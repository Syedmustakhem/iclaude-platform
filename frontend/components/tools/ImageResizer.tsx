"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type ResizeResult = {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
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

function getOutputType(
  type: string,
): "image/jpeg" | "image/png" | "image/webp" {
  if (type === "image/png") return "image/png";
  if (type === "image/webp") return "image/webp";

  return "image/jpeg";
}

function getExtension(type: string): string {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";

  return "jpg";
}

export default function ImageResizer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspectRatio, setLockAspectRatio] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ResizeResult | null>(null);

  const aspectRatio =
    originalWidth > 0 && originalHeight > 0
      ? originalWidth / originalHeight
      : 1;

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }

      if (resultUrlRef.current) {
        URL.revokeObjectURL(resultUrlRef.current);
      }
    };
  }, []);

  function clearResult() {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }

    setResult(null);
  }

  function loadImageDimensions(
    selectedFile: File,
    url: string,
  ) {
    const image = new Image();

    image.onload = () => {
      setOriginalWidth(image.naturalWidth);
      setOriginalHeight(image.naturalHeight);

      setWidth(String(image.naturalWidth));
      setHeight(String(image.naturalHeight));
    };

    image.onerror = () => {
      setError("Unable to read the selected image.");
    };

    image.src = url;
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

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const url = URL.createObjectURL(selectedFile);

    previewUrlRef.current = url;

    setFile(selectedFile);
    setPreviewUrl(url);

    loadImageDimensions(selectedFile, url);
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

  function updateWidth(value: string) {
    setWidth(value);
    clearResult();

    if (!lockAspectRatio) return;

    const numericWidth = Number(value);

    if (
      numericWidth > 0 &&
      originalWidth > 0 &&
      originalHeight > 0
    ) {
      setHeight(
        String(
          Math.max(
            1,
            Math.round(numericWidth / aspectRatio),
          ),
        ),
      );
    }
  }

  function updateHeight(value: string) {
    setHeight(value);
    clearResult();

    if (!lockAspectRatio) return;

    const numericHeight = Number(value);

    if (
      numericHeight > 0 &&
      originalWidth > 0 &&
      originalHeight > 0
    ) {
      setWidth(
        String(
          Math.max(
            1,
            Math.round(numericHeight * aspectRatio),
          ),
        ),
      );
    }
  }

  async function resizeImage() {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    const targetWidth = Number(width);
    const targetHeight = Number(height);

    if (
      !Number.isFinite(targetWidth) ||
      !Number.isFinite(targetHeight) ||
      targetWidth < 1 ||
      targetHeight < 1
    ) {
      setError(
        "Please enter valid width and height values.",
      );
      return;
    }

    if (targetWidth > 10000 || targetHeight > 10000) {
      setError(
        "For browser performance, width and height cannot exceed 10,000 pixels.",
      );
      return;
    }

    setError("");
    setIsResizing(true);
    clearResult();

    try {
      const image = new Image();
      const imageUrl = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("Unable to read image."));
        image.src = imageUrl;
      });

      URL.revokeObjectURL(imageUrl);

      const canvas = document.createElement("canvas");

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Your browser does not support image resizing.",
        );
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.drawImage(
        image,
        0,
        0,
        targetWidth,
        targetHeight,
      );

      const outputType = getOutputType(file.type);

      const blob = await new Promise<Blob | null>(
        (resolve) => {
          canvas.toBlob(
            resolve,
            outputType,
            outputType === "image/png" ? undefined : 0.92,
          );
        },
      );

      if (!blob) {
        throw new Error("Unable to create resized image.");
      }

      const url = URL.createObjectURL(blob);

      resultUrlRef.current = url;

      setResult({
        blob,
        url,
        width: targetWidth,
        height: targetHeight,
        size: blob.size,
      });
    } catch (resizeError) {
      console.error(resizeError);

      setError(
        "Something went wrong while resizing the image. Please try another image.",
      );
    } finally {
      setIsResizing(false);
    }
  }

  function downloadResult() {
    if (!result || !file) return;

    const extension = getExtension(result.blob.type);

    const originalName = file.name.replace(
      /\.[^/.]+$/,
      "",
    );

    const downloadName = `${originalName}-${result.width}x${result.height}.${extension}`;

    const link = document.createElement("a");

    link.href = result.url;
    link.download = downloadName;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function reset() {
    clearResult();

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setFile(null);
    setPreviewUrl("");
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth("");
    setHeight("");
    setLockAspectRatio(true);
    setError("");
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Choose an image to resize"
      />

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={[
            "group relative flex min-h-[290px] cursor-pointer sm:min-h-[320px]",
            "items-center justify-center overflow-hidden rounded-[28px] sm:rounded-3xl",
            "border-2 border-dashed px-4 py-8 text-center sm:px-6 sm:py-10",
            "transition-all duration-300 ease-out",
            "focus-visible:outline-none focus-visible:ring-4",
            "focus-visible:ring-blue-100",
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-52 w-52 max-w-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/40 blur-3xl transition-transform duration-700 group-hover:scale-125"
          />

          <div className="relative z-10 flex max-w-lg flex-col items-center">
            <div
              className={[
                "flex h-14 w-14 items-center justify-center rounded-[18px] sm:h-16 sm:w-16",
                "border border-blue-100 bg-white text-blue-600 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all",
                isDragging
                  ? "scale-110 border-blue-500 bg-blue-600 text-white"
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

            <h3 className="mt-4 text-[1.25rem] font-black tracking-[-0.025em] text-slate-950 sm:text-2xl">
              {isDragging
                ? "Drop your image here"
                : "Upload an image"}
            </h3>

            <p className="mt-3 max-w-md text-[13px] leading-6 text-slate-500 sm:text-sm">
              Drag and drop your image here, or choose
              one from your device.
            </p>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 sm:w-auto"
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
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:rounded-3xl">
              <div className="flex min-h-[270px] items-center justify-center p-3 sm:min-h-[420px] sm:p-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                <img
                  src={previewUrl}
                  alt={`Preview of ${file.name}`}
                  className="max-h-[420px] max-w-full rounded-2xl object-contain shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
                />
              </div>

              <div className="border-t border-slate-200 bg-white px-5 py-4">
                <p className="truncate text-sm font-bold text-slate-900">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {originalWidth} × {originalHeight} px
                  {" • "}
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:rounded-3xl sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Resize
              </p>

              <h3 className="mt-2 text-[1.2rem] font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
                Set dimensions
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-slate-500 sm:text-sm">
                Enter the exact pixel dimensions you need.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold text-slate-600">
                    Width
                  </span>

                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={width}
                    onChange={(event) =>
                      updateWidth(event.target.value)
                    }
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-600">
                    Height
                  </span>

                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={height}
                    onChange={(event) =>
                      updateHeight(event.target.value)
                    }
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={() =>
                  setLockAspectRatio((current) => !current)
                }
                className={[
                  "mt-4 flex min-h-14 w-full items-center justify-between rounded-2xl",
                  "border px-4 py-3 text-left transition",
                  lockAspectRatio
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200 bg-white hover:bg-slate-50",
                ].join(" ")}
              >
                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    Lock aspect ratio
                  </span>

                  <span className="mt-0.5 block text-xs text-slate-500">
                    Keep the original proportions
                  </span>
                </span>

                <span
                  className={[
                    "flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition",
                    lockAspectRatio
                      ? "bg-blue-600"
                      : "bg-slate-300",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                      lockAspectRatio
                        ? "translate-x-5"
                        : "translate-x-0",
                    ].join(" ")}
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={resizeImage}
                disabled={isResizing}
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResizing ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Resizing...
                  </>
                ) : (
                  "Resize image"
                )}
              </button>

              <button
                type="button"
                onClick={reset}
                className="mt-3 min-h-12 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                Choose another image
              </button>
            </div>
          </div>

          {result && (
            <div className="rounded-[28px] border border-emerald-200 bg-emerald-50/60 p-4 shadow-[0_18px_50px_rgba(16,185,129,0.08)] sm:rounded-3xl sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                    Resize complete
                  </p>

                  <h3 className="mt-2 text-[1.2rem] font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
                    Your resized image is ready
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      Original: {originalWidth} ×{" "}
                      {originalHeight}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      New: {result.width} ×{" "}
                      {result.height}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {formatFileSize(result.size)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={downloadResult}
                  className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
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

              <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                <img
                  src={result.url}
                  alt={`Resized image at ${result.width} by ${result.height} pixels`}
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

          <p className="flex items-center justify-center gap-2 text-center text-[11px] leading-5 text-slate-500 sm:text-xs">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            Images are resized locally in your browser. Your
            selected image is not uploaded to the iclaude server.
          </p>
        </div>
      )}
    </div>
  );
}