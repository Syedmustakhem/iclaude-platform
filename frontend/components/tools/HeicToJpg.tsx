"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import heic2any from "heic2any";

type ItemStatus = "ready" | "converting" | "done" | "error";

type ImageItem = {
  id: string;
  file: File;
  status: ItemStatus;
  outputUrl?: string;
  outputName?: string;
  outputSize?: number;
  error?: string;
};

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function isHeic(file: File) {
  const name = file.name.toLowerCase();

  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function downloadFile(url: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

async function convertHeicToJpg(
  file: File,
  quality: number,
): Promise<Blob> {
  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality,
  });

  const blob = Array.isArray(result) ? result[0] : result;

  if (!(blob instanceof Blob)) {
    throw new Error("The browser could not create the JPG file.");
  }

  return blob;
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-10 w-10"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="7"
        width="38"
        height="34"
        rx="9"
        className="fill-blue-50 stroke-blue-200"
        strokeWidth="2"
      />
      <path
        d="M13 34 23 24l7 7 4-4 6 7"
        className="stroke-blue-600"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="31"
        cy="17"
        r="3"
        className="fill-blue-500"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 10 3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 15.5v1h12v-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 6 8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
        className="fill-white stroke-slate-300"
        strokeWidth="1.5"
      />
      <path
        d="M14 3.5V8h4"
        className="stroke-slate-300"
        strokeWidth="1.5"
      />
      <path
        d="M8 13h8M8 16h5"
        className="stroke-slate-400"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HeicToJpg() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itemsRef = useRef<ImageItem[]>([]);

  const [items, setItems] = useState<ImageItem[]>([]);
  const [quality, setQuality] = useState(0.9);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        if (item.outputUrl) {
          URL.revokeObjectURL(item.outputUrl);
        }
      });
    };
  }, []);

  const addFiles = useCallback((files: File[]) => {
    setGlobalError("");

    const heicFiles = files.filter(isHeic);
    const invalidTypeCount = files.length - heicFiles.length;

    const validFiles: File[] = [];
    const errors: string[] = [];

    for (const file of heicFiles) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(
          `${file.name} is larger than ${MAX_FILE_SIZE_MB} MB.`,
        );
        continue;
      }

      validFiles.push(file);
    }

    if (invalidTypeCount > 0) {
      errors.push("Only HEIC and HEIF files are supported.");
    }

    if (errors.length > 0) {
      setGlobalError(errors.join(" "));
    }

    if (validFiles.length === 0) {
      return;
    }

    const newItems: ImageItem[] = validFiles.map((file) => ({
      id: createId(),
      file,
      status: "ready",
    }));

    setItems((current) => [...current, ...newItems]);
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    addFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  };

  const removeItem = (id: string) => {
    setItems((current) => {
      const item = current.find((entry) => entry.id === id);

      if (item?.outputUrl) {
        URL.revokeObjectURL(item.outputUrl);
      }

      return current.filter((entry) => entry.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((item) => {
      if (item.outputUrl) {
        URL.revokeObjectURL(item.outputUrl);
      }
    });

    setItems([]);
    setGlobalError("");
  };

  const convertAll = async () => {
    if (items.length === 0 || isConverting) {
      return;
    }

    setGlobalError("");
    setIsConverting(true);

    try {
      for (const item of items) {
        if (item.status === "done") {
          continue;
        }

        setItems((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: "converting",
                  error: undefined,
                }
              : entry,
          ),
        );

        try {
          const blob = await convertHeicToJpg(
            item.file,
            quality,
          );

          const outputUrl = URL.createObjectURL(blob);
          const outputName =
            item.file.name.replace(/\.(heic|heif)$/i, "") +
            ".jpg";

          setItems((current) =>
            current.map((entry) =>
              entry.id === item.id
                ? {
                    ...entry,
                    status: "done",
                    outputUrl,
                    outputName,
                    outputSize: blob.size,
                    error: undefined,
                  }
                : entry,
            ),
          );
        } catch (error) {
          setItems((current) =>
            current.map((entry) =>
              entry.id === item.id
                ? {
                    ...entry,
                    status: "error",
                    error:
                      error instanceof Error
                        ? error.message
                        : "HEIC conversion failed.",
                  }
                : entry,
            ),
          );
        }
      }
    } finally {
      setIsConverting(false);
    }
  };

  const downloadAll = () => {
    items.forEach((item) => {
      if (item.outputUrl && item.outputName) {
        downloadFile(item.outputUrl, item.outputName);
      }
    });
  };

  const completedCount = items.filter(
    (item) => item.status === "done",
  ).length;

  const convertingCount = items.filter(
    (item) => item.status === "converting",
  ).length;

  const hasFiles = items.length > 0;

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
        {/* Workspace header */}
        <div className="border-b border-slate-100 bg-gradient-to-br from-white via-white to-blue-50/60 px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50">
                <UploadIcon />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-black tracking-tight text-slate-950">
                    HEIC to JPG converter
                  </h2>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
                    Free
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Convert HEIC and HEIF photos to JPG directly in
                  your browser.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                HEIC / HEIF
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                Up to 50 MB
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                Browser-based
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Error */}
          {globalError && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-700"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-black">
                !
              </span>
              <p>{globalError}</p>
            </div>
          )}

          {/* Empty state / upload */}
          {!hasFiles && (
            <div
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setIsDragging(false);
              }}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={[
                "group relative cursor-pointer overflow-hidden rounded-[24px] border-2 border-dashed px-5 py-12 text-center transition duration-200 sm:px-8 sm:py-16",
                isDragging
                  ? "border-blue-500 bg-blue-50/80 shadow-[0_0_0_5px_rgba(59,130,246,0.08)]"
                  : "border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:bg-blue-50/40",
              ].join(" ")}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/heic,image/heif,.heic,.heif"
                multiple
                className="hidden"
                onChange={handleInputChange}
              />

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] border border-blue-100 bg-white shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
                <UploadIcon />
              </div>

              <h3 className="mt-6 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                Drop your HEIC files here
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                Drag and drop your photos here, or click to browse
                from your device.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-600 shadow-sm">
                  HEIC
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-600 shadow-sm">
                  HEIF
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-600 shadow-sm">
                  Up to 50 MB
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-600 shadow-sm">
                  Multiple files
                </span>
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-slate-950/10 transition group-hover:bg-blue-600">
                Choose HEIC files
              </div>
            </div>
          )}

          {/* Files workspace */}
          {hasFiles && (
            <div className="space-y-5">
              {/* Toolbar */}
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black text-slate-950">
                    {items.length}{" "}
                    {items.length === 1 ? "file" : "files"} selected
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {completedCount} converted
                    {convertingCount > 0
                      ? ` · ${convertingCount} converting`
                      : ""}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    + Add files
                  </button>

                  <button
                    type="button"
                    onClick={clearAll}
                    className="rounded-xl px-4 py-2.5 text-xs font-extrabold text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    Clear all
                  </button>

                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/heic,image/heif,.heic,.heif"
                    multiple
                    className="hidden"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Quality */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-slate-950">
                        JPG quality
                      </h3>
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-extrabold text-blue-700">
                        {Math.round(quality * 100)}%
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Choose a balance between image quality and
                      output file size.
                    </p>
                  </div>

                  <div className="w-full sm:max-w-[280px]">
                    <input
                      type="range"
                      min="0.5"
                      max="1"
                      step="0.05"
                      value={quality}
                      onChange={(event) =>
                        setQuality(Number(event.target.value))
                      }
                      aria-label="JPG quality"
                      className="w-full accent-blue-600"
                    />

                    <div className="mt-1.5 flex justify-between text-[10px] font-bold text-slate-400">
                      <span>Smaller</span>
                      <span>Higher quality</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* File list */}
              <div className="space-y-2.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-3.5 transition hover:border-slate-300"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                          {item.status === "done" ? (
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                              <CheckIcon />
                            </span>
                          ) : (
                            <FileIcon />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-slate-900">
                            {item.file.name}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-400">
                            <span>{formatBytes(item.file.size)}</span>
                            <span>•</span>
                            <span>
                              {item.status === "ready" && "Ready"}
                              {item.status === "converting" &&
                                "Converting..."}
                              {item.status === "done" &&
                                `JPG · ${formatBytes(
                                  item.outputSize ?? 0,
                                )}`}
                              {item.status === "error" &&
                                "Conversion failed"}
                            </span>
                          </div>

                          {item.status === "error" && item.error && (
                            <p className="mt-1.5 text-xs font-semibold text-red-600">
                              {item.error}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {item.outputUrl && item.outputName && (
                          <button
                            type="button"
                            onClick={() =>
                              downloadFile(
                                item.outputUrl as string,
                                item.outputName as string,
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-blue-600"
                          >
                            <DownloadIcon />
                            Download
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.file.name}`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main action */}
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/60 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-950">
                      Ready to convert?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Your files stay in this browser during conversion.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={convertAll}
                      disabled={isConverting || items.length === 0}
                      className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-slate-950/10 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isConverting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Converting...
                        </>
                      ) : (
                        <>
                          Convert{" "}
                          {items.length === 1
                            ? "to JPG"
                            : `${items.length} files`}
                        </>
                      )}
                    </button>

                    {completedCount > 0 && (
                      <button
                        type="button"
                        onClick={downloadAll}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <DownloadIcon />
                        Download all
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy / trust */}
          <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckIcon />
              </span>
              <div>
                <p className="text-xs font-extrabold text-slate-800">
                  Browser processing
                </p>
                <p className="mt-0.5 text-[11px] leading-5 text-slate-400">
                  Your original files are not uploaded by this tool.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <CheckIcon />
              </span>
              <div>
                <p className="text-xs font-extrabold text-slate-800">
                  Multiple files
                </p>
                <p className="mt-0.5 text-[11px] leading-5 text-slate-400">
                  Add several HEIC photos and convert them together.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                <CheckIcon />
              </span>
              <div>
                <p className="text-xs font-extrabold text-slate-800">
                  JPG quality control
                </p>
                <p className="mt-0.5 text-[11px] leading-5 text-slate-400">
                  Adjust output quality before conversion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
