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
    <div className="w-full">
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
          "iclaude-upload group relative overflow-hidden",
          "min-h-[300px] cursor-pointer px-6 py-10 sm:min-h-[340px] sm:px-10 sm:py-14",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100",
          isDragging ? "iclaude-upload-active" : "",
        ].join(" ")}
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/50 blur-3xl transition-transform duration-500 group-hover:scale-125"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div className="absolute left-8 top-8 h-2 w-2 rounded-full bg-blue-400" />
          <div className="absolute right-12 top-16 h-1.5 w-1.5 rounded-full bg-blue-300" />
          <div className="absolute bottom-12 left-16 h-1.5 w-1.5 rounded-full bg-blue-300" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
          {/* Upload icon */}
          <div
            aria-hidden="true"
            className={[
              "flex h-16 w-16 items-center justify-center rounded-2xl",
              "border border-blue-100 bg-white text-blue-600 shadow-sm",
              "transition-all duration-300",
              isDragging
                ? "scale-110 border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "group-hover:-translate-y-1 group-hover:scale-105",
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

          <span
            className={[
              "mt-6 inline-flex rounded-full px-3 py-1 text-xs font-semibold",
              isDragging
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-100 text-slate-600",
            ].join(" ")}
          >
            {isDragging ? "Release to upload" : "Secure file selection"}
          </span>

          <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            {isDragging ? "Drop your file here" : "Upload your file"}
          </h3>

          <p
            id="upload-help"
            className="mt-3 max-w-lg text-sm leading-7 text-slate-600"
          >
            Drag and drop your {multiple ? "files" : "file"} here, or choose{" "}
            {multiple ? "files" : "a file"} from your device.
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openFilePicker();
            }}
            className="iclaude-button-primary mt-7"
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

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>{formatLabel || "Supported formats"}</span>
            <span aria-hidden="true">•</span>
            <span>Maximum {maxFileSizeMB} MB</span>
          </div>
        </div>
      </div>

      {/* Validation error */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
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

      {/* Selected files */}
      {selectedFiles.length > 0 && (
        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-950">
                Selected {multiple ? "files" : "file"}
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                Ready for processing
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              {selectedFiles.length}{" "}
              {selectedFiles.length === 1 ? "file" : "files"}
            </span>
          </div>

          <div className="space-y-3">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                className="iclaude-card-static flex items-center gap-3 p-4 sm:gap-4"
              >
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
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
                  className="shrink-0 rounded-lg px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
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
            className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white opacity-55"
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

      <p className="mt-5 text-center text-xs leading-5 text-slate-500">
        Your selected file stays in your browser until processing is
        connected.
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