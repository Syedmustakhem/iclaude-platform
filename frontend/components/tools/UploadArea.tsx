"use client";

import {
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

type UploadAreaProps = {
  acceptedFormats: string[];
  maxFileSizeMB?: number;
  multiple?: boolean;
};

export default function UploadArea({
  acceptedFormats,
  maxFileSizeMB = 50,
  multiple = false,
}: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const acceptAttribute = acceptedFormats
    .map((format) => `.${format.trim().replace(".", "").toLowerCase()}`)
    .join(",");

  const formatLabel = acceptedFormats
    .map((format) => format.replace(".", "").toUpperCase())
    .join(", ");

  function openFilePicker() {
    inputRef.current?.click();
  }

  function validateFiles(files: File[]) {
    setError("");

    if (files.length === 0) {
      return;
    }

    const validFiles: File[] = [];
    const oversizedFiles: string[] = [];

    for (const file of files) {
      const sizeInMB = file.size / (1024 * 1024);

      if (sizeInMB > maxFileSizeMB) {
        oversizedFiles.push(file.name);
        continue;
      }

      validFiles.push(file);
    }

    if (oversizedFiles.length > 0) {
      const firstFile = oversizedFiles[0];

      setError(
        oversizedFiles.length === 1
          ? `"${firstFile}" exceeds the ${maxFileSizeMB} MB file size limit.`
          : `${oversizedFiles.length} files exceed the ${maxFileSizeMB} MB file size limit.`,
      );
    }

    setSelectedFiles(multiple ? validFiles : validFiles.slice(0, 1));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    validateFiles(Array.from(event.target.files ?? []));

    // Allows the same file to be selected again.
    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!isDragging) {
      setIsDragging(true);
    }
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

    validateFiles(Array.from(event.dataTransfer.files));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openFilePicker();
  }

  function removeFile(index: number) {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter((_, fileIndex) => fileIndex !== index),
    );

    setError("");
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttribute}
        multiple={multiple}
        onChange={handleFileChange}
        className="sr-only"
        aria-label={`Choose ${multiple ? "files" : "a file"} to upload`}
      />

      <div
        role="button"
        tabIndex={0}
        aria-label={`Upload ${multiple ? "files" : "a file"}`}
        aria-describedby="upload-help"
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          "iclaude-upload group relative w-full min-w-0 max-w-full overflow-hidden",
          "min-h-[290px] cursor-pointer px-4 py-7 sm:min-h-[330px] sm:px-8 sm:py-12",
          "transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100",
          isDragging ? "iclaude-upload-active" : "",
        ].join(" ")}
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 max-w-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/45 blur-3xl transition-transform duration-700 group-hover:scale-125"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-200/70 to-transparent"
        />

        {/* Decorative dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div className="absolute left-5 top-6 h-2 w-2 rounded-full bg-blue-400 sm:left-8 sm:top-8" />
          <div className="absolute right-6 top-10 h-1.5 w-1.5 rounded-full bg-blue-300 sm:right-12 sm:top-16" />
          <div className="absolute bottom-8 left-10 h-1.5 w-1.5 rounded-full bg-blue-300 sm:bottom-12 sm:left-16" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-xl min-w-0 flex-col items-center text-center">
          {/* Upload icon */}
          <div
            aria-hidden="true"
            className={[
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] sm:h-16 sm:w-16",
              "border border-blue-100 bg-white text-blue-600 shadow-[0_10px_30px_rgba(15,23,42,0.08)]",
              "transition-all duration-300",
              isDragging
                ? "scale-110 border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "group-hover:-translate-y-1 group-hover:scale-105",
            ].join(" ")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 sm:h-7 sm:w-7"
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

          <span
            className={[
              "mt-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] sm:mt-6",
              isDragging
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white/80 text-slate-600",
            ].join(" ")}
          >
            {isDragging ? "Release to upload" : "Secure file selection"}
          </span>

          <h3 className="mt-3 text-[1.25rem] font-black tracking-[-0.025em] text-slate-950 sm:mt-4 sm:text-2xl">
            {isDragging ? "Drop your file here" : "Upload your file"}
          </h3>

          <p
            id="upload-help"
            className="mt-2 max-w-lg px-2 text-[13px] leading-6 text-slate-600 sm:mt-3 sm:text-sm sm:leading-7"
          >
            Drag and drop your {multiple ? "files" : "file"} here, or choose{" "}
            {multiple ? "files" : "a file"} from your device.
          </p>

          {/* Styled file picker */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openFilePicker();
            }}
            className={[
              "mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white sm:w-auto",
              "bg-blue-600",
              "shadow-[0_10px_24px_rgba(37,99,235,0.20)]",
              "transition-all duration-200",
              "hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_14px_30px_rgba(37,99,235,0.25)]",
              "active:translate-y-0 active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100",
            ].join(" ")}
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
                d="M12 5v14m-7-7h14"
              />
            </svg>

            Choose {multiple ? "files" : "file"}
          </button>

          <div className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 px-2 text-[11px] font-medium text-slate-500 sm:mt-5 sm:text-xs">
            <span className="break-words">{formatLabel || "Supported formats"}</span>
            <span aria-hidden="true">•</span>
            <span>Maximum {maxFileSizeMB} MB</span>
          </div>
        </div>
      </div>

      {/* Validation error */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex min-w-0 items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
        >
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold"
          >
            !
          </span>

          <p className="min-w-0 pt-0.5 leading-6">{error}</p>
        </div>
      )}

      {/* Selected files */}
      {selectedFiles.length > 0 && (
        <div className="mt-7 min-w-0">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-950">
                Selected {multiple ? "files" : "file"}
              </h4>

              <p className="mt-1 text-xs text-slate-500">
                Ready for processing
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              {selectedFiles.length}{" "}
              {selectedFiles.length === 1 ? "file" : "files"}
            </span>
          </div>

          <div className="space-y-3">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                className="iclaude-card-static group/file flex min-w-0 items-center gap-3 rounded-2xl p-3.5 sm:gap-4 sm:p-4"
              >
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-transform duration-200 group-hover/file:scale-105"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 3v5h5"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`Remove ${file.name}`}
                  className="min-h-10 shrink-0 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 active:scale-95"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Processing state */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="mt-5 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white opacity-55"
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
                d="M12 9v4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17h.01"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.3 3.8 2.9 17a2 2 0 0 0 1.75 3h14.7a2 2 0 0 0 1.75-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
              />
            </svg>

            Processing service unavailable
          </button>
        </div>
      )}

      <p className="mt-5 flex items-center justify-center gap-2 px-2 text-center text-[11px] leading-5 text-slate-500 sm:text-xs">
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
        Your selected file stays in your browser until processing is connected.
      </p>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = ["Bytes", "KB", "MB", "GB"];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const value = bytes / 1024 ** index;

  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}