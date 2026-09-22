"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

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

export default function BackgroundRemover() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  function handleFile(selectedFile: File) {
    setError("");

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

  function reset() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setFile(null);
    setPreviewUrl("");
    setError("");
  }

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Choose an image for background removal"
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
                : "Private browser preview"}
            </span>

            <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
              {isDragging
                ? "Drop your image here"
                : "Upload an image"}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Choose a JPG, PNG, or WebP image to preview
              the background-removal workflow.
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
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <div className="flex min-h-[320px] items-center justify-center p-5">
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
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                AI processing coming next
              </span>

              <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                Background removal is ready for backend integration
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                The frontend upload and preview workflow is
                complete. The actual subject segmentation will
                be connected to the AI processing service later.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    ✓
                  </span>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Image upload
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      File validation and browser preview are
                      working.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                    2
                  </span>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      AI background segmentation
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Will be connected to the processing
                      backend later.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                    3
                  </span>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Transparent PNG download
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Will become available after processing
                      integration.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-6 flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white opacity-50"
              >
                Background removal unavailable
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
            The selected image remains in your browser. No
            image is uploaded to the iclaude server during this
            frontend-only stage.
          </p>
        </div>
      )}
    </div>
  );
}