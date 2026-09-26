"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type ResizeResult = {
  url: string;
  width: number;
  height: number;
  size: number;
  filename: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code?: string;
    message?: string;
  };
};

type PresignResponse = {
  uploadUrl: string;
  objectKey: string;
  expiresIn: number;
  tool: string;
  filename: string;
  contentType: string;
  size: number;
};

type ConfirmResponse = {
  fileId: string;
  status: string;
  tool: string;
  objectKey: string;
  filename: string;
  contentType: string;
  size: number;
};

type JobResponse = {
  jobId: string;
  tool: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  inputFileId?: string;
  outputFileId?: string;
  error?: {
    code: string;
    message: string;
  };
};

type OutputFormat = "jpeg" | "png" | "webp";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8787/api";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const FORMAT_OPTIONS: {
  value: OutputFormat;
  label: string;
  description: string;
}[] = [
  { value: "webp", label: "WebP", description: "Smaller file size" },
  { value: "jpeg", label: "JPEG", description: "Widest support" },
  { value: "png", label: "PNG", description: "Lossless, supports transparency" },
];

function defaultFormatFor(mimeType: string): OutputFormat {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/jpeg") return "jpeg";
  return "webp";
}

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

function getSessionId(): string {
  if (typeof window === "undefined") {
    return "anonymous";
  }

  const key = "iclaude_session_id";

  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const sessionId = crypto.randomUUID();

  window.localStorage.setItem(
    key,
    sessionId,
  );

  return sessionId;
}

async function parseApiResponse<T>(
  response: Response,
): Promise<ApiResponse<T>> {
  let data: ApiResponse<T>;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      `The server returned an invalid response (${response.status}).`,
    );
  }

  if (!response.ok || !data.success) {
    throw new Error(
      data.error?.message ||
        `Request failed with status ${response.status}.`,
    );
  }

  return data;
}

function getOutputName(
  originalName: string,
  format: OutputFormat,
): string {
  const base = originalName.replace(/\.[^/.]+$/, "");
  const extension = format === "jpeg" ? "jpg" : format;
  return `${base}-resized.${extension}`;
}

export default function ImageResizer() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const previewUrlRef =
    useRef<string | null>(null);

  const resultUrlRef =
    useRef<string | null>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [originalWidth, setOriginalWidth] =
    useState(0);

  const [originalHeight, setOriginalHeight] =
    useState(0);

  const [width, setWidth] =
    useState("");

  const [height, setHeight] =
    useState("");

  const [lockAspectRatio, setLockAspectRatio] =
    useState(true);

  const [format, setFormat] =
    useState<OutputFormat>("webp");

  const [isDragging, setIsDragging] =
    useState(false);

  const [isResizing, setIsResizing] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [error, setError] =
    useState("");

  const [result, setResult] =
    useState<ResizeResult | null>(null);

  const aspectRatio =
    originalWidth > 0 &&
    originalHeight > 0
      ? originalWidth / originalHeight
      : 1;

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(
          previewUrlRef.current,
        );
      }

      if (resultUrlRef.current) {
        URL.revokeObjectURL(
          resultUrlRef.current,
        );
      }
    };
  }, []);

  function clearResult() {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(
        resultUrlRef.current,
      );

      resultUrlRef.current = null;
    }

    setResult(null);
    setProgress(0);
  }

  function loadImageDimensions(
    selectedFile: File,
    url: string,
  ) {
    const image = new Image();

    image.onload = () => {
      setOriginalWidth(
        image.naturalWidth,
      );

      setOriginalHeight(
        image.naturalHeight,
      );

      setWidth(
        String(image.naturalWidth),
      );

      setHeight(
        String(image.naturalHeight),
      );
    };

    image.onerror = () => {
      setError(
        "Unable to read the selected image.",
      );
    };

    image.src = url;
  }

  function handleFile(
    selectedFile: File,
  ) {
    setError("");
    clearResult();

    if (
      !ACCEPTED_TYPES.includes(
        selectedFile.type,
      )
    ) {
      setError(
        "Please select a JPG, JPEG, PNG, or WebP image.",
      );

      return;
    }

    if (
      selectedFile.size > MAX_FILE_SIZE
    ) {
      setError(
        "The maximum supported file size is 50 MB.",
      );

      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(
        previewUrlRef.current,
      );
    }

    const url =
      URL.createObjectURL(selectedFile);

    previewUrlRef.current = url;

    setFile(selectedFile);
    setPreviewUrl(url);
    setFormat(defaultFormatFor(selectedFile.type));

    loadImageDimensions(
      selectedFile,
      url,
    );
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile =
      event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }

    event.target.value = "";
  }

  function handleDragOver(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  }

  function handleDragLeave(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const droppedFile =
      event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  }

  function updateWidth(
    value: string,
  ) {
    setWidth(value);
    clearResult();

    if (!lockAspectRatio) {
      return;
    }

    const numericWidth =
      Number(value);

    if (
      numericWidth > 0 &&
      originalWidth > 0 &&
      originalHeight > 0
    ) {
      setHeight(
        String(
          Math.max(
            1,
            Math.round(
              numericWidth /
                aspectRatio,
            ),
          ),
        ),
      );
    }
  }

  function updateHeight(
    value: string,
  ) {
    setHeight(value);
    clearResult();

    if (!lockAspectRatio) {
      return;
    }

    const numericHeight =
      Number(value);

    if (
      numericHeight > 0 &&
      originalWidth > 0 &&
      originalHeight > 0
    ) {
      setWidth(
        String(
          Math.max(
            1,
            Math.round(
              numericHeight *
                aspectRatio,
            ),
          ),
        ),
      );
    }
  }

  function selectFormat(value: OutputFormat) {
    if (isResizing) return;
    setFormat(value);
    clearResult();
  }

  async function resizeImage() {
    if (!file) {
      setError(
        "Please select an image first.",
      );

      return;
    }

    const targetWidth =
      Number(width);

    const targetHeight =
      Number(height);

    if (
      !Number.isFinite(
        targetWidth,
      ) ||
      !Number.isFinite(
        targetHeight,
      ) ||
      targetWidth < 1 ||
      targetHeight < 1
    ) {
      setError(
        "Please enter valid width and height values.",
      );

      return;
    }

    if (
      !Number.isInteger(
        targetWidth,
      ) ||
      !Number.isInteger(
        targetHeight,
      )
    ) {
      setError(
        "Width and height must be whole numbers.",
      );

      return;
    }

    if (
      targetWidth > 10000 ||
      targetHeight > 10000
    ) {
      setError(
        "Width and height cannot exceed 10,000 pixels.",
      );

      return;
    }

    setError("");
    setIsResizing(true);
    setProgress(5);
    clearResult();

    try {
      const sessionId =
        getSessionId();

      const presignResponse =
        await fetch(
          `${API_BASE_URL}/uploads/presign`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              filename: file.name,
              contentType: file.type,
              size: file.size,
              tool: "image-resizer",
              sessionId,
            }),
          },
        );

      const presign =
        await parseApiResponse<PresignResponse>(
          presignResponse,
        );

      if (!presign.data) {
        throw new Error(
          "The upload URL was not returned.",
        );
      }

      setProgress(15);

      const uploadResponse =
        await fetch(
          presign.data.uploadUrl,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                file.type,
            },
            body: file,
          },
        );

      if (!uploadResponse.ok) {
        throw new Error(
          `Image upload failed (${uploadResponse.status}).`,
        );
      }

      setProgress(35);

      const confirmResponse =
        await fetch(
          `${API_BASE_URL}/uploads/confirm`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              objectKey:
                presign.data.objectKey,
              filename: file.name,
              contentType: file.type,
              size: file.size,
              tool: "image-resizer",
              sessionId,
            }),
          },
        );

      const confirmation =
        await parseApiResponse<ConfirmResponse>(
          confirmResponse,
        );

      if (!confirmation.data?.fileId) {
        throw new Error(
          "The uploaded file could not be confirmed.",
        );
      }

      setProgress(45);

      const jobResponse =
        await fetch(
          `${API_BASE_URL}/jobs`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              tool: "image-resizer",
              fileId:
                confirmation.data.fileId,
              sessionId,
              options: {
                resize: {
                  width:
                    targetWidth,
                  height:
                    targetHeight,
                  fit: "contain",
                  format,
                },
              },
            }),
          },
        );

      const job =
        await parseApiResponse<JobResponse>(
          jobResponse,
        );

      if (!job.data?.jobId) {
        throw new Error(
          "The processing job could not be created.",
        );
      }

      const jobId =
        job.data.jobId;

      let completedJob:
        | JobResponse
        | null = null;

      const maxAttempts = 120;

      for (
        let attempt = 0;
        attempt < maxAttempts;
        attempt++
      ) {
        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              attempt === 0
                ? 500
                : 1000,
            ),
        );

        const statusResponse =
          await fetch(
            `${API_BASE_URL}/jobs/${jobId}`,
            {
              method: "GET",
              cache: "no-store",
            },
          );

        const status =
          await parseApiResponse<JobResponse>(
            statusResponse,
          );

        if (!status.data) {
          throw new Error(
            "The server returned an invalid job status.",
          );
        }

        const currentJob =
          status.data;

        if (
          currentJob.status ===
          "failed"
        ) {
          throw new Error(
            currentJob.error
              ?.message ||
              "Image resizing failed.",
          );
        }

        if (
          currentJob.status ===
          "completed"
        ) {
          completedJob =
            currentJob;

          setProgress(100);

          break;
        }

        const backendProgress =
          currentJob.progress ?? 0;

        setProgress(
          Math.min(
            95,
            45 +
              Math.round(
                backendProgress *
                  0.5,
              ),
          ),
        );
      }

      if (!completedJob) {
        throw new Error(
          "The image is taking longer than expected. Please try again.",
        );
      }

      if (
        !completedJob.outputFileId
      ) {
        throw new Error(
          "The resize completed but no output file was returned.",
        );
      }

      const downloadResponse =
        await fetch(
          `${API_BASE_URL}/files/${encodeURIComponent(
            completedJob.outputFileId,
          )}/download`,
          {
            method: "GET",
          },
        );

      if (!downloadResponse.ok) {
        throw new Error(
          `Unable to retrieve the resized image (${downloadResponse.status}).`,
        );
      }

      const outputBlob =
        await downloadResponse.blob();

      if (
        outputBlob.size === 0
      ) {
        throw new Error(
          "The server returned an empty image.",
        );
      }

      const outputUrl =
        URL.createObjectURL(
          outputBlob,
        );

      resultUrlRef.current =
        outputUrl;

      setResult({
        url: outputUrl,
        width: targetWidth,
        height: targetHeight,
        size: outputBlob.size,
        filename: getOutputName(file.name, format),
      });
    } catch (resizeError) {
      console.error(
        "Image resize failed:",
        resizeError,
      );

      setError(
        resizeError instanceof Error
          ? resizeError.message
          : "Something went wrong while resizing the image. Please try again.",
      );
    } finally {
      setIsResizing(false);
    }
  }

  function downloadResult() {
    if (!result) {
      return;
    }

    const link =
      document.createElement("a");

    link.href = result.url;
    link.download =
      result.filename;

    document.body.appendChild(
      link,
    );

    link.click();

    link.remove();
  }

  function reset() {
    clearResult();

    if (previewUrlRef.current) {
      URL.revokeObjectURL(
        previewUrlRef.current,
      );

      previewUrlRef.current =
        null;
    }

    setFile(null);
    setPreviewUrl("");
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth("");
    setHeight("");
    setLockAspectRatio(true);
    setFormat("webp");
    setError("");
    setProgress(0);
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
          onClick={() =>
            inputRef.current?.click()
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={
            handleDragOver
          }
          onDragLeave={
            handleDragLeave
          }
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
                : "Secure cloud processing"}
            </span>

            <h3 className="mt-4 text-[1.25rem] font-black tracking-[-0.025em] text-slate-950 sm:text-2xl">
              {isDragging
                ? "Drop your image here"
                : "Upload an image"}
            </h3>

            <p className="mt-3 max-w-md text-[13px] leading-6 text-slate-500 sm:text-sm">
              Drag and drop your image here,
              or choose one from your device.
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  {originalWidth} ×{" "}
                  {originalHeight} px
                  {" • "}
                  {formatFileSize(
                    file.size,
                  )}
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
                Enter the exact pixel dimensions
                you need.
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
                      updateWidth(
                        event.target.value,
                      )
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
                      updateHeight(
                        event.target.value,
                      )
                    }
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={() =>
                  setLockAspectRatio(
                    (current) =>
                      !current,
                  )
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

              <div className="mt-5">
                <span className="text-xs font-bold text-slate-600">
                  Output format
                </span>

                <div className="mt-2 grid grid-cols-3 gap-2">
                  {FORMAT_OPTIONS.map((option) => {
                    const active = format === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={isResizing}
                        onClick={() => selectFormat(option.value)}
                        aria-pressed={active}
                        title={option.description}
                        className={[
                          "rounded-xl border px-2 py-2.5 text-center transition",
                          active
                            ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-transparent bg-slate-50 text-slate-500 hover:border-blue-100 hover:bg-blue-50/60 hover:text-blue-700",
                          "disabled:cursor-not-allowed disabled:opacity-60",
                        ].join(" ")}
                      >
                        <span className="block text-[11px] font-extrabold">
                          {option.label}
                        </span>
                        <span className="mt-0.5 block text-[9px] font-medium opacity-70">
                          {option.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {isResizing && (
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>
                      Processing image...
                    </span>

                    <span>
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              )}

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

                    Processing...
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
                      Original:{" "}
                      {originalWidth} ×{" "}
                      {originalHeight}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      New:{" "}
                      {result.width} ×{" "}
                      {result.height}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {formatFileSize(
                        result.size,
                      )}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {format.toUpperCase()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    downloadResult
                  }
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
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

              <p className="pt-0.5 leading-6">
                {error}
              </p>
            </div>
          )}

          <p className="flex items-center justify-center gap-2 text-center text-[11px] leading-5 text-slate-500 sm:text-xs">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
            />

            Images are securely uploaded for
            processing and automatically processed
            by iclaude.
          </p>
        </div>
      )}
    </div>
  );
}