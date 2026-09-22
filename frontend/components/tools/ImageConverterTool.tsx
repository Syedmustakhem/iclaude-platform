"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ConversionType = "jpg-to-png" | "png-to-jpg" | "heic-to-jpg";

type ImageConverterToolProps = {
  type: ConversionType;
};

type ConversionState =
  | "idle"
  | "processing"
  | "success"
  | "error";

const CONFIG: Record<
  ConversionType,
  {
    sourceLabel: string;
    targetLabel: string;
    acceptedTypes: string;
    extensions: string;
    title: string;
    description: string;
  }
> = {
  "jpg-to-png": {
    sourceLabel: "JPG",
    targetLabel: "PNG",
    acceptedTypes: "image/jpeg",
    extensions: ".jpg,.jpeg",
    title: "JPG to PNG Converter",
    description:
      "Convert a JPG or JPEG image into a PNG file directly in your browser.",
  },

  "png-to-jpg": {
    sourceLabel: "PNG",
    targetLabel: "JPG",
    acceptedTypes: "image/png",
    extensions: ".png",
    title: "PNG to JPG Converter",
    description:
      "Convert a PNG image into a JPG file for broader compatibility and compact sharing.",
  },

  "heic-to-jpg": {
    sourceLabel: "HEIC",
    targetLabel: "JPG",
    acceptedTypes: "image/heic,image/heif",
    extensions: ".heic,.heif",
    title: "HEIC to JPG Converter",
    description:
      "Convert HEIC and HEIF photos into widely compatible JPG images.",
  },
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const value = bytes / 1024 ** index;

  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`;
}

function getExtension(name: string): string {
  const parts = name.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() ?? "" : "";
}

function isSupportedFile(
  file: File,
  type: ConversionType,
): boolean {
  const config = CONFIG[type];
  const extension = getExtension(file.name);

  if (type === "jpg-to-png") {
    return (
      file.type === "image/jpeg" ||
      extension === "jpg" ||
      extension === "jpeg"
    );
  }

  if (type === "png-to-jpg") {
    return file.type === "image/png" || extension === "png";
  }

  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    extension === "heic" ||
    extension === "heif"
  );
}

async function convertStandardImage(
  file: File,
  type: "jpg-to-png" | "png-to-jpg",
): Promise<Blob> {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(
          new Error(
            "The browser could not read this image. Please try another file.",
          ),
        );

      image.src = objectUrl;
    });

    const canvas = document.createElement("canvas");

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error(
        "Your browser could not create an image processing workspace.",
      );
    }

    if (type === "png-to-jpg") {
      context.fillStyle = "#ffffff";
      context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );
    }

    context.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    const mimeType =
      type === "jpg-to-png"
        ? "image/png"
        : "image/jpeg";

    const quality =
      type === "jpg-to-png" ? undefined : 0.92;

    const blob = await new Promise<Blob | null>(
      (resolve) => {
        canvas.toBlob(
          resolve,
          mimeType,
          quality,
        );
      },
    );

    if (!blob) {
      throw new Error(
        "The image could not be converted. Please try another file.",
      );
    }

    return blob;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function convertHeicToJpg(
  file: File,
): Promise<Blob> {
  /*
   * HEIC decoding is intentionally kept behind a dynamic
   * import so the initial page bundle stays lightweight.
   *
   * The actual HEIC decoder will be added when the HEIC
   * processing dependency is installed in the project.
   */

  try {
    const moduleName = "heic2any";

    const heicModule = await import(
      /* webpackIgnore: true */
      moduleName
    );

    const converter = heicModule.default;

    const result = await converter({
      blob: file,
      toType: "image/jpeg",
      quality: 0.92,
    });

    if (Array.isArray(result)) {
      const first = result[0];

      if (first instanceof Blob) {
        return first;
      }
    }

    if (result instanceof Blob) {
      return result;
    }

    throw new Error(
      "The HEIC conversion did not return a valid image.",
    );
  } catch {
    throw new Error(
      "HEIC conversion is not available yet. The HEIC decoder will be connected in the next processing step.",
    );
  }
}

export default function ImageConverterTool({
  type,
}: ImageConverterToolProps) {
  const config = CONFIG[type];

  const inputRef = useRef<HTMLInputElement | null>(
    null,
  );

  const [file, setFile] = useState<File | null>(
    null,
  );

  const [state, setState] =
    useState<ConversionState>("idle");

  const [error, setError] = useState("");

  const [resultUrl, setResultUrl] =
    useState<string | null>(null);

  const [resultSize, setResultSize] =
    useState<number | null>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const resetResult = useCallback(() => {
    setResultUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return null;
    });

    setResultSize(null);
  }, []);

  useEffect(() => {
    return () => {
      resetResult();
    };
  }, [resetResult]);

  const selectFile = useCallback(
    (selectedFile: File | null) => {
      if (!selectedFile) return;

      setError("");
      resetResult();

      if (!isSupportedFile(selectedFile, type)) {
        setFile(null);
        setState("error");
        setError(
          `Please choose a supported ${config.sourceLabel} file.`,
        );
        return;
      }

      setFile(selectedFile);
      setState("idle");
    },
    [config.sourceLabel, resetResult, type],
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    selectFile(event.target.files?.[0] ?? null);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    setIsDragging(false);

    selectFile(
      event.dataTransfer.files?.[0] ?? null,
    );
  };

  const convertFile = async () => {
    if (!file) {
      setError(
        `Choose a ${config.sourceLabel} file first.`,
      );
      return;
    }

    setState("processing");
    setError("");
    resetResult();

    try {
      let blob: Blob;

      if (
        type === "jpg-to-png" ||
        type === "png-to-jpg"
      ) {
        blob = await convertStandardImage(
          file,
          type,
        );
      } else {
        blob = await convertHeicToJpg(file);
      }

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setResultSize(blob.size);
      setState("success");
    } catch (conversionError) {
      setState("error");

      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Something went wrong while converting the file.",
      );
    }
  };

  const downloadFile = () => {
    if (!resultUrl || !file) return;

    const baseName =
      file.name.replace(/\.[^/.]+$/, "") ||
      "converted-image";

    const extension =
      config.targetLabel.toLowerCase();

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download = `${baseName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const chooseAnother = () => {
    resetResult();
    setFile(null);
    setError("");
    setState("idle");

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const resultReduction =
    file && resultSize
      ? Math.round(
          ((file.size - resultSize) / file.size) *
            100,
        )
      : null;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_28px_90px_-45px_rgba(15,23,42,0.38)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-[-140px] h-80 w-80 rounded-full bg-blue-500/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-180px] left-[-100px] h-80 w-80 rounded-full bg-cyan-400/[0.06] blur-3xl"
      />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 border-b border-slate-100 pb-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              {config.sourceLabel} →{" "}
              {config.targetLabel}
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl">
              {config.title}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
              {config.description}
            </p>
          </div>

          <div className="hidden shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right sm:block">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
              Output
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              .{config.targetLabel.toLowerCase()}
            </p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={`${config.acceptedTypes},${config.extensions}`}
          onChange={handleInputChange}
          className="sr-only"
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
            className={`mt-8 cursor-pointer rounded-[28px] border-2 border-dashed p-8 text-center transition duration-300 sm:p-12 ${
              isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:bg-blue-50/40"
            }`}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-2xl text-white shadow-lg shadow-slate-950/10">
              ↑
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-950">
              Drop your {config.sourceLabel} file here
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              or click to browse from your device
            </p>

            <span className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
              Choose file
            </span>

            <p className="mt-5 text-xs font-medium text-slate-400">
              Supported: {config.extensions}
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-950 shadow-sm">
                      {config.sourceLabel.slice(
                        0,
                        3,
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-slate-950">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={chooseAnother}
                  className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Choose another
                </button>
              </div>
            </div>

            {state === "success" &&
            resultUrl &&
            resultSize ? (
              <div className="mt-5 rounded-[24px] border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
                        ✓
                      </span>

                      <p className="text-sm font-black text-slate-950">
                        Conversion complete
                      </p>
                    </div>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {formatBytes(file.size)} →{" "}
                      {formatBytes(resultSize)}
                      {resultReduction !== null &&
                      resultReduction > 0
                        ? ` · ${resultReduction}% smaller`
                        : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={downloadFile}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Download .{config.targetLabel.toLowerCase()}
                    <span aria-hidden="true">
                      ↓
                    </span>
                  </button>
                </div>
              </div>
            ) : null}

            {state !== "success" ? (
              <button
                type="button"
                onClick={convertFile}
                disabled={state === "processing"}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state === "processing" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Converting...
                  </>
                ) : (
                  <>
                    Convert to {config.targetLabel}
                    <span aria-hidden="true">
                      →
                    </span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={chooseAnother}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-800 transition hover:bg-slate-50"
              >
                Convert another file
              </button>
            )}
          </div>
        )}

        {error ? (
          <div
            role="alert"
            className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium leading-7 text-red-700"
          >
            {error}
          </div>
        ) : null}

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            ["Fast workflow", "Convert directly in the browser."],
            ["Simple output", `Get a .${config.targetLabel.toLowerCase()} file.`],
            ["Keep original", "Your source file stays unchanged."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-100 bg-white p-4"
            >
              <p className="text-xs font-black text-slate-900">
                {title}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}