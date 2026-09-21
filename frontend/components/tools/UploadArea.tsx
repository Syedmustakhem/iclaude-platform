"use client";

import {
  ChangeEvent,
  DragEvent,
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
    .map((format) => {
      const normalized = format
        .trim()
        .toLowerCase()
        .replace(".", "");

      return `.${normalized}`;
    })
    .join(",");

  const validateFiles = (files: File[]) => {
    setError("");

    if (!files.length) {
      return;
    }

    const validFiles: File[] = [];

    for (const file of files) {
      const fileSizeMB = file.size / (1024 * 1024);

      if (fileSizeMB > maxFileSizeMB) {
        setError(
          `"${file.name}" exceeds the ${maxFileSizeMB} MB file size limit.`
        );

        continue;
      }

      validFiles.push(file);
    }

    if (!multiple) {
      setSelectedFiles(validFiles.slice(0, 1));
      return;
    }

    setSelectedFiles(validFiles);
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);

    validateFiles(files);

    event.target.value = "";
  };

  const handleDragOver = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);

    validateFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter(
        (_, fileIndex) => fileIndex !== index
      )
    );

    setError("");
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttribute}
        multiple={multiple}
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Choose files"
      />

      <div
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            openFilePicker();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          "rounded-2xl border-2 border-dashed p-8 text-center",
          "transition-all duration-200 sm:p-12",
          "focus-visible:outline-none focus-visible:ring-4",
          "focus-visible:ring-blue-100",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40",
        ].join(" ")}
      >
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600"
          aria-hidden="true"
        >
          ↑
        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-900">
          {isDragging
            ? "Drop your files here"
            : "Upload your file"}
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
          Drag and drop your file here, or click to browse
          files from your device.
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openFilePicker();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Choose file
        </button>

        <p className="mt-4 text-xs text-slate-500">
          Supported: {acceptedFormats.join(", ")} · Max{" "}
          {maxFileSizeMB} MB
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900">
              Selected files
            </h4>

            <span className="text-xs text-slate-500">
              {selectedFiles.length}{" "}
              {selectedFiles.length === 1
                ? "file"
                : "files"}
            </span>
          </div>

          {selectedFiles.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(file.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <button
          type="button"
          disabled
          className="mt-5 w-full rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white opacity-60"
        >
          Process files
        </button>
      )}

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        Your files will only be processed when the tool is
        connected to the iclaude processing service.
      </p>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  const safeIndex = Math.min(
    index,
    units.length - 1
  );

  const value =
    bytes / Math.pow(1024, safeIndex);

  return `${value.toFixed(
    safeIndex === 0 ? 0 : 2
  )} ${units[safeIndex]}`;
}