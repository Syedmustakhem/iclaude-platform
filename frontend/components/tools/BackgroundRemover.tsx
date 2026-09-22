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
                : "Private browser preview"}
            </span>

            <h3 className="mt-4 text-[1.25rem] font-black tracking-[-0.025em] text-slate-950 sm:text-2xl">
              {isDragging
                ? "Drop your image here"
                : "Upload an image"}
            </h3>

            <p className="mt-3 max-w-md text-[13px] leading-6 text-slate-500 sm:text-sm">
              Choose a JPG, PNG, or WebP image to preview
              the background-removal workflow.
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
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:rounded-3xl">
              <div className="flex min-h-[270px] items-center justify-center p-3 sm:min-h-[400px] sm:p-5">
                <img
                  src={previewUrl}
                  alt={`Preview of ${file.name}`}
                  className="max-h-[420px] max-w-full rounded-2xl object-contain shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
                />
              </div>

              <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-5">
                <p className="truncate text-sm font-bold text-slate-900">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:rounded-3xl sm:p-6">
              <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                AI processing coming next
              </span>

              <h3 className="mt-4 text-[1.25rem] font-black tracking-[-0.025em] text-slate-950 sm:text-2xl">
                Background removal is ready for backend integration
              </h3>

              <p className="mt-4 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">
                The frontend upload and preview workflow is
                complete. The actual subject segmentation will
                be connected to the AI processing service later.
              </p>

              <div className="mt-6 space-y-2.5">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 sm:p-4">
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

                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 sm:p-4">
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

                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 sm:p-4">
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
                className="mt-6 flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white opacity-50"
              >
                Background removal unavailable
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
            The selected image remains in your browser. No
            image is uploaded to the iclaude server during this
            frontend-only stage.
          </p>
        </div>
      )}
    </div>
  );
}