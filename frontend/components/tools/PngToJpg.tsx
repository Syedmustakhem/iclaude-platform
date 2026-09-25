"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  status: "ready" | "converting" | "done" | "error";
  outputUrl?: string;
  outputName?: string;
  error?: string;
};

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function isPng(file: File) {
  return (
    file.type === "image/png" ||
    file.name.toLowerCase().endsWith(".png")
  );
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function downloadFile(url: string, filename: string) {
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function convertPngToJpg(
  file: File,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Your browser could not create a canvas.");
        }

        // PNG supports transparency while JPG does not.
        // Paint a white background before drawing the PNG.
        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height,
        );

        context.drawImage(
          image,
          0,
          0,
          canvas.width,
          canvas.height,
        );

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  "The browser could not create the JPG file.",
                ),
              );
              return;
            }

            resolve(blob);
          },
          "image/jpeg",
          quality,
        );
      } catch (error) {
        reject(
          error instanceof Error
            ? error
            : new Error("Conversion failed."),
        );
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);

      reject(
        new Error(
          "The PNG image could not be loaded.",
        ),
      );
    };

    image.src = objectUrl;
  });
}

export default function PngToJpg() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [items, setItems] = useState<ImageItem[]>([]);
  const [quality, setQuality] = useState(0.9);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const addFiles = useCallback((files: File[]) => {
    setGlobalError("");

    const pngFiles = files.filter(isPng);

    const invalidTypeCount =
      files.length - pngFiles.length;

    const validFiles: File[] = [];
    const errors: string[] = [];

    for (const file of pngFiles) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(
          `${file.name} is larger than ${MAX_FILE_SIZE_MB} MB.`,
        );
        continue;
      }

      validFiles.push(file);
    }

    if (invalidTypeCount > 0) {
      errors.push(
        "Only PNG files are supported.",
      );
    }

    if (errors.length > 0) {
      setGlobalError(errors.join(" "));
    }

    if (validFiles.length === 0) {
      return;
    }

    const newItems: ImageItem[] = validFiles.map(
      (file) => ({
        id: createId(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: "ready",
      }),
    );

    setItems((current) => [
      ...current,
      ...newItems,
    ]);
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    addFiles(files);

    event.target.value = "";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    setIsDragging(false);

    const files = Array.from(
      event.dataTransfer.files,
    );

    addFiles(files);
  };

  const removeItem = (id: string) => {
    setItems((current) => {
      const item = current.find(
        (entry) => entry.id === id,
      );

      if (item) {
        URL.revokeObjectURL(item.previewUrl);

        if (item.outputUrl) {
          URL.revokeObjectURL(item.outputUrl);
        }
      }

      return current.filter(
        (entry) => entry.id !== id,
      );
    });
  };

  const clearAll = () => {
    items.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);

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
          const blob = await convertPngToJpg(
            item.file,
            quality,
          );

          const outputUrl =
            URL.createObjectURL(blob);

          const outputName =
            item.file.name.replace(
              /\.png$/i,
              "",
            ) + ".jpg";

          setItems((current) =>
            current.map((entry) =>
              entry.id === item.id
                ? {
                    ...entry,
                    status: "done",
                    outputUrl,
                    outputName,
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
                        : "Conversion failed.",
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
      if (
        item.outputUrl &&
        item.outputName
      ) {
        downloadFile(
          item.outputUrl,
          item.outputName,
        );
      }
    });
  };

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        URL.revokeObjectURL(
          item.previewUrl,
        );

        if (item.outputUrl) {
          URL.revokeObjectURL(
            item.outputUrl,
          );
        }
      });
    };
  }, []);

  const completedCount = items.filter(
    (item) => item.status === "done",
  ).length;

  return (
    <div className="space-y-6">
      {/* Upload */}
      {items.length === 0 && (
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
            "cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition sm:p-12",
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40",
          ].join(" ")}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png,.png"
            multiple
            className="hidden"
            onChange={handleInputChange}
          />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
            🖼️
          </div>

          <h3 className="mt-5 text-lg font-black text-slate-900">
            Drop PNG files here
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            or click to choose PNG images
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              PNG only
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              Up to 50 MB
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              Multiple files
            </span>
          </div>
        </div>
      )}

      {globalError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {globalError}
        </div>
      )}

      {/* Controls */}
      {items.length > 0 && (
        <>
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              + Add PNG files
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/png,.png"
              multiple
              className="hidden"
              onChange={handleInputChange}
            />

            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-bold text-slate-400 transition hover:text-red-600"
            >
              Clear all
            </button>
          </div>

          {/* Quality */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  JPG quality
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Higher quality produces a larger file.
                </p>
              </div>

              <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-black text-slate-900 shadow-sm">
                {Math.round(quality * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              value={quality}
              onChange={(event) =>
                setQuality(
                  Number(event.target.value),
                )
              }
              className="mt-5 w-full accent-blue-600"
            />

            <div className="mt-2 flex justify-between text-[11px] font-semibold text-slate-400">
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>
          </div>

          {/* File list */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={item.previewUrl}
                  alt=""
                  className="h-16 w-16 rounded-xl border border-slate-100 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {item.file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {(
                      item.file.size /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </p>

                  {item.status === "converting" && (
                    <p className="mt-2 text-xs font-bold text-blue-600">
                      Converting...
                    </p>
                  )}

                  {item.status === "done" && (
                    <p className="mt-2 text-xs font-bold text-emerald-600">
                      Converted successfully
                    </p>
                  )}

                  {item.status === "error" && (
                    <p className="mt-2 text-xs font-bold text-red-600">
                      {item.error}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {item.outputUrl &&
                    item.outputName && (
                      <button
                        type="button"
                        onClick={() =>
                          downloadFile(
                            item.outputUrl!,
                            item.outputName!,
                          )
                        }
                        className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                      >
                        Download
                      </button>
                    )}

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-500 transition hover:border-red-200 hover:text-red-600"
                    aria-label={`Remove ${item.file.name}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={convertAll}
              disabled={
                isConverting ||
                items.length === 0
              }
              className="flex-1 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isConverting
                ? "Converting..."
                : `Convert ${items.length} ${
                    items.length === 1
                      ? "PNG"
                      : "PNGs"
                  } to JPG`}
            </button>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={downloadAll}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
              >
                Download all ({completedCount})
              </button>
            )}
          </div>
        </>
      )}

      <p className="text-center text-xs leading-6 text-slate-400">
        PNG images are converted directly in your browser.
        Your original files are not uploaded to a server by
        this component.
      </p>
    </div>
  );
}