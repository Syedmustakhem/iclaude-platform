"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: { code?: string; message?: string };
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
  error?: { code: string; message: string };
};

type CompressionResult = {
  url: string;
  originalSize: number;
  compressedSize: number;
  reduction: number;
  filename: string;
  mimeType: string;
};

type Preset = {
  label: string;
  quality: number;
  description: string;
};

type OutputFormat = "jpeg" | "png" | "webp";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.iclaude.in/api"
).replace(/\/+$/, "");

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const PRESETS: Preset[] = [
  { label: "Light", quality: 0.9, description: "More detail" },
  { label: "Balanced", quality: 0.7, description: "Recommended" },
  { label: "Strong", quality: 0.45, description: "Smallest file" },
];

const FORMAT_OPTIONS: {
  value: OutputFormat;
  label: string;
  description: string;
}[] = [
  { value: "webp", label: "WebP", description: "Smaller file size" },
  { value: "jpeg", label: "JPEG", description: "Widest support" },
  { value: "png", label: "PNG", description: "Lossless (quality slider has no effect)" },
];

function defaultFormatFor(mimeType: string): OutputFormat {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/jpeg") return "jpeg";
  return "webp";
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "anonymous";
  const key = "iclaude_session_id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  window.localStorage.setItem(key, id);
  return id;
}

async function parseApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  let data: ApiResponse<T>;
  try {
    data = await response.json();
  } catch {
    throw new Error(`The server returned an invalid response (${response.status}).`);
  }

  if (!response.ok || !data.success) {
    throw new Error(data.error?.message || `Request failed with status ${response.status}.`);
  }
  return data;
}

function getOutputExtension(format: OutputFormat): string {
  if (format === "jpeg") return "jpg";
  return format;
}

function getOutputName(originalName: string, format: OutputFormat): string {
  const base = originalName.replace(/\.[^/.]+$/, "");
  return `${base}-compressed.${getOutputExtension(format)}`;
}

export default function ImageCompressor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState<OutputFormat>("webp");
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<CompressionResult | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  function clearResult() {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setResult(null);
  }

  function handleFile(selectedFile: File) {
    setError("");
    setStatusText("");
    setProgress(0);
    clearResult();

    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setError("Please select a JPG, JPEG, PNG, or WebP image.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("The maximum supported file size is 50 MB.");
      return;
    }

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(selectedFile);
    previewUrlRef.current = url;
    setFile(selectedFile);
    setPreviewUrl(url);
    setFormat(defaultFormatFor(selectedFile.type));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
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
    if (droppedFile) handleFile(droppedFile);
  }

  function selectPreset(preset: Preset) {
    if (isCompressing) return;
    setQuality(preset.quality);
    setError("");
    clearResult();
  }

  function selectFormat(value: OutputFormat) {
    if (isCompressing) return;
    setFormat(value);
    setError("");
    clearResult();
  }

  async function compressImage() {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setError("");
    setStatusText("Preparing your image...");
    setIsCompressing(true);
    setProgress(5);
    clearResult();

    try {
      const sessionId = getSessionId();

      setStatusText("Preparing secure upload...");
      const presignResponse = await fetch(`${API_BASE_URL}/uploads/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
          tool: "image-compressor",
          sessionId,
        }),
      });
      const presign = await parseApiResponse<PresignResponse>(presignResponse);
      if (!presign.data) throw new Error("The upload URL was not returned.");
      setProgress(15);

      setStatusText("Uploading image...");
      const uploadResponse = await fetch(presign.data.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!uploadResponse.ok) throw new Error(`Image upload failed (${uploadResponse.status}).`);
      setProgress(35);

      setStatusText("Confirming upload...");
      const confirmResponse = await fetch(`${API_BASE_URL}/uploads/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objectKey: presign.data.objectKey,
          filename: file.name,
          contentType: file.type,
          size: file.size,
          tool: "image-compressor",
          sessionId,
        }),
      });
      const confirmation = await parseApiResponse<ConfirmResponse>(confirmResponse);
      if (!confirmation.data?.fileId) throw new Error("The uploaded file could not be confirmed.");
      setProgress(45);

      const qualityPercent = Math.round(quality * 100);
      setStatusText(`Creating compression job at ${qualityPercent}% quality...`);

      const jobResponse = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "image-compressor",
          fileId: confirmation.data.fileId,
          sessionId,
          options: {
            compression: {
              quality: qualityPercent,
              format,
            },
          },
        }),
      });

      const job = await parseApiResponse<JobResponse>(jobResponse);
      if (!job.data?.jobId) throw new Error("The compression job could not be created.");

      const jobId = job.data.jobId;
      setProgress(50);
      setStatusText("Compressing image...");

      let completedJob: JobResponse | null = null;
      const maxAttempts = 120;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        await new Promise<void>((resolve) => setTimeout(resolve, attempt === 0 ? 500 : 1000));

        const statusResponse = await fetch(`${API_BASE_URL}/jobs/${encodeURIComponent(jobId)}`, {
          method: "GET",
          cache: "no-store",
        });
        const status = await parseApiResponse<JobResponse>(statusResponse);
        if (!status.data) throw new Error("The server returned an invalid job status.");

        const currentJob = status.data;
        if (currentJob.status === "failed") {
          throw new Error(currentJob.error?.message || "Image compression failed.");
        }
        if (currentJob.status === "completed") {
          completedJob = currentJob;
          setProgress(100);
          setStatusText("Compression complete.");
          break;
        }

        const backendProgress = currentJob.progress ?? 0;
        setProgress(Math.min(95, 50 + Math.round(backendProgress * 0.45)));
        setStatusText(
          currentJob.status === "queued"
            ? "Waiting for compression worker..."
            : "Compressing image...",
        );
      }

      if (!completedJob) {
        throw new Error("The image is taking longer than expected. Please try again.");
      }
      if (!completedJob.outputFileId) {
        throw new Error("The compression completed but no output file was returned.");
      }

      setStatusText("Preparing compressed image...");
      const downloadResponse = await fetch(
        `${API_BASE_URL}/files/${encodeURIComponent(completedJob.outputFileId)}/download`,
      );
      if (!downloadResponse.ok) {
        throw new Error(`Unable to retrieve the compressed image (${downloadResponse.status}).`);
      }

      const outputBlob = await downloadResponse.blob();
      if (outputBlob.size === 0) throw new Error("The server returned an empty image.");

      const outputUrl = URL.createObjectURL(outputBlob);
      resultUrlRef.current = outputUrl;
      const outputMimeType = outputBlob.type || file.type || "image/webp";
      const reduction = Math.max(0, ((file.size - outputBlob.size) / file.size) * 100);

      setResult({
        url: outputUrl,
        originalSize: file.size,
        compressedSize: outputBlob.size,
        reduction,
        filename: getOutputName(file.name, format),
        mimeType: outputMimeType,
      });
      setProgress(100);
    } catch (compressionError) {
      console.error("Image compression failed:", compressionError);
      setProgress(0);
      setStatusText("");
      setError(
        compressionError instanceof Error
          ? compressionError.message
          : "Something went wrong while compressing the image. Please try again.",
      );
    } finally {
      setIsCompressing(false);
    }
  }

  function downloadResult() {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result.url;
    link.download = result.filename;
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
    setError("");
    setStatusText("");
    setProgress(0);
    setQuality(0.7);
    setFormat("webp");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Choose an image to compress"
      />

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          className={`group relative flex min-h-[300px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
          }`}
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/35 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] border border-blue-100 bg-white text-blue-600 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0 4 4m-4-4L8 8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13v4.5A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5V13" />
              </svg>
            </div>
            <span className="mt-5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
              {isDragging ? "Release to upload" : "Secure server processing"}
            </span>
            <h3 className="mt-4 text-[1.45rem] font-black tracking-[-0.03em] text-slate-950 sm:text-2xl">
              {isDragging ? "Drop your image here" : "Upload an image"}
            </h3>
            <p className="mt-3 max-w-md text-[13px] leading-6 text-slate-500 sm:text-sm">
              Drag and drop your image here, or choose one from your device.
            </p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
            >
              Choose image
            </button>
            <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
              JPG, PNG, WebP • Maximum 50 MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm">
              <div className="flex min-h-[280px] items-center justify-center p-4 sm:min-h-[420px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt={`Preview of ${file.name}`} className="max-h-[420px] max-w-full rounded-2xl object-contain shadow-[0_18px_50px_rgba(15,23,42,0.10)]" />
              </div>
              <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-5">
                <p className="truncate text-sm font-bold text-slate-900">{file.name}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">Original · {formatFileSize(file.size)}</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">{file.type.split("/")[1]?.toUpperCase() ?? "IMAGE"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">Compression</p>
              <h3 className="mt-2 text-xl font-black tracking-[-0.02em] text-slate-950">Choose quality</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Higher quality keeps more detail but creates a larger file.</p>

              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Quality</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{Math.round(quality * 100)}%</span>
                </div>

                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  disabled={isCompressing || format === "png"}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                    clearResult();
                  }}
                  className="mt-5 w-full accent-blue-600 disabled:opacity-40"
                  aria-label="Compression quality"
                />

                <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
                  <span>Smaller file</span>
                  <span>Higher quality</span>
                </div>

                {format === "png" && (
                  <p className="mt-2 text-[11px] font-medium text-amber-600">
                    PNG output is lossless — the quality slider has no effect. Choose WebP or JPEG for size-based compression.
                  </p>
                )}

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {PRESETS.map((preset) => {
                    const active = Math.abs(quality - preset.quality) < 0.001;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        disabled={isCompressing || format === "png"}
                        onClick={() => selectPreset(preset)}
                        aria-pressed={active}
                        title={preset.description}
                        className={`rounded-xl border px-2 py-2.5 text-center transition ${
                          active
                            ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-transparent bg-slate-50 text-slate-500 hover:border-blue-100 hover:bg-blue-50/60 hover:text-blue-700"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        <span className="block text-[11px] font-extrabold">{preset.label}</span>
                        <span className="mt-0.5 block text-[9px] font-medium opacity-70">{Math.round(preset.quality * 100)}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <span className="text-sm font-semibold text-slate-700">Output format</span>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {FORMAT_OPTIONS.map((option) => {
                    const active = format === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={isCompressing}
                        onClick={() => selectFormat(option.value)}
                        aria-pressed={active}
                        title={option.description}
                        className={`rounded-xl border px-2 py-2.5 text-center transition ${
                          active
                            ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-transparent bg-slate-50 text-slate-500 hover:border-blue-100 hover:bg-blue-50/60 hover:text-blue-700"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        <span className="block text-[11px] font-extrabold">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {isCompressing && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{statusText || "Processing..."}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={compressImage}
                disabled={isCompressing}
                className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCompressing ? "Compressing..." : "Compress image"}
              </button>

              <button
                type="button"
                onClick={reset}
                disabled={isCompressing}
                className="mt-3 min-h-11 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Choose another image
              </button>
            </div>
          </div>

          {result && (
            <div className="rounded-[28px] border border-emerald-200 bg-emerald-50/60 p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Compression complete</p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">Your image is ready</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Original: {formatFileSize(result.originalSize)}</span>
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">Compressed: {formatFileSize(result.compressedSize)}</span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">{result.reduction.toFixed(1)}% smaller</span>
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">{format.toUpperCase()}</span>
                  </div>
                </div>
                <button type="button" onClick={downloadResult} className="inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 sm:w-auto">
                  Download
                </button>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.url} alt="Compressed image preview" className="mx-auto max-h-[360px] max-w-full object-contain" />
              </div>
            </div>
          )}

          {error && (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          )}

          {isCompressing && statusText && (
            <p className="text-center text-xs text-slate-500" aria-live="polite">{statusText}</p>
          )}

          {!isCompressing && (
            <p className="text-center text-xs text-slate-500">Your image is securely uploaded, processed, and returned through iclaude&apos;s processing pipeline.</p>
          )}
        </div>
      )}
    </div>
  );
}