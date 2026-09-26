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

type ConversionResult = {
  url: string;
  size: number;
  filename: string;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8787/api"
).replace(/\/+$/, "");

const ACCEPTED_TYPES = ["application/pdf"];

/**
 * Matches the processor's own 20 MB cap so the
 * frontend fails fast instead of uploading a file
 * the backend will reject anyway.
 */
const MAX_FILE_SIZE = 20 * 1024 * 1024;

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

function getOutputName(originalName: string): string {
  const base = originalName.replace(/\.[^/.]+$/, "");
  return `${base}.docx`;
}

export default function PdfToWord() {
  const inputRef = useRef<HTMLInputElement>(null);
  const resultUrlRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);

  useEffect(() => {
    return () => {
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
      setError("Please select a PDF file.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("The maximum supported file size is 20 MB.");
      return;
    }

    setFile(selectedFile);
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

  async function convertFile() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setError("");
    setStatusText("Preparing your file...");
    setIsConverting(true);
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
          tool: "pdf-to-word",
          sessionId,
        }),
      });
      const presign = await parseApiResponse<PresignResponse>(presignResponse);
      if (!presign.data) throw new Error("The upload URL was not returned.");
      setProgress(15);

      setStatusText("Uploading PDF...");
      const uploadResponse = await fetch(presign.data.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!uploadResponse.ok) throw new Error(`File upload failed (${uploadResponse.status}).`);
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
          tool: "pdf-to-word",
          sessionId,
        }),
      });
      const confirmation = await parseApiResponse<ConfirmResponse>(confirmResponse);
      if (!confirmation.data?.fileId) throw new Error("The uploaded file could not be confirmed.");
      setProgress(45);

      setStatusText("Creating conversion job...");
      const jobResponse = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "pdf-to-word",
          fileId: confirmation.data.fileId,
          sessionId,
        }),
      });

      const job = await parseApiResponse<JobResponse>(jobResponse);
      if (!job.data?.jobId) throw new Error("The conversion job could not be created.");

      const jobId = job.data.jobId;
      setProgress(50);
      setStatusText("Converting to Word...");

      let completedJob: JobResponse | null = null;
      const maxAttempts = 120;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        await new Promise<void>((resolve) => setTimeout(resolve, attempt === 0 ? 1000 : 1500));

        const statusResponse = await fetch(`${API_BASE_URL}/jobs/${encodeURIComponent(jobId)}`, {
          method: "GET",
          cache: "no-store",
        });
        const status = await parseApiResponse<JobResponse>(statusResponse);
        if (!status.data) throw new Error("The server returned an invalid job status.");

        const currentJob = status.data;
        if (currentJob.status === "failed") {
          throw new Error(currentJob.error?.message || "PDF to Word conversion failed.");
        }
        if (currentJob.status === "completed") {
          completedJob = currentJob;
          setProgress(100);
          setStatusText("Conversion complete.");
          break;
        }

        const backendProgress = currentJob.progress ?? 0;
        setProgress(Math.min(95, 50 + Math.round(backendProgress * 0.45)));
        setStatusText(
          currentJob.status === "queued"
            ? "Waiting for conversion worker..."
            : "Converting to Word...",
        );
      }

      if (!completedJob) {
        throw new Error("This is taking longer than expected. Please try again.");
      }
      if (!completedJob.outputFileId) {
        throw new Error("The conversion completed but no output file was returned.");
      }

      setStatusText("Preparing your document...");
      const downloadResponse = await fetch(
        `${API_BASE_URL}/files/${encodeURIComponent(completedJob.outputFileId)}/download`,
      );
      if (!downloadResponse.ok) {
        throw new Error(`Unable to retrieve the converted document (${downloadResponse.status}).`);
      }

      const outputBlob = await downloadResponse.blob();
      if (outputBlob.size === 0) throw new Error("The server returned an empty document.");

      const outputUrl = URL.createObjectURL(outputBlob);
      resultUrlRef.current = outputUrl;

      setResult({
        url: outputUrl,
        size: outputBlob.size,
        filename: getOutputName(file.name),
      });
      setProgress(100);
    } catch (conversionError) {
      console.error("PDF to Word conversion failed:", conversionError);
      setProgress(0);
      setStatusText("");
      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Something went wrong while converting your file. Please try again.",
      );
    } finally {
      setIsConverting(false);
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
    setFile(null);
    setError("");
    setStatusText("");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Choose a PDF to convert to Word"
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5V8h4.5" />
              </svg>
            </div>
            <span className="mt-5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
              {isDragging ? "Release to upload" : "Secure server processing"}
            </span>
            <h3 className="mt-4 text-[1.45rem] font-black tracking-[-0.03em] text-slate-950 sm:text-2xl">
              {isDragging ? "Drop your PDF here" : "Upload a PDF"}
            </h3>
            <p className="mt-3 max-w-md text-[13px] leading-6 text-slate-500 sm:text-sm">
              Drag and drop your PDF here, or choose one from your device.
            </p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
            >
              Choose PDF
            </button>
            <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
              PDF only • Maximum 20 MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5V8h4.5" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">{file.name}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  PDF · {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            {isConverting && (
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
              onClick={convertFile}
              disabled={isConverting}
              className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isConverting ? "Converting..." : "Convert to Word"}
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={isConverting}
              className="mt-3 min-h-11 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Choose another file
            </button>
          </div>

          {result && (
            <div className="rounded-[28px] border border-emerald-200 bg-emerald-50/60 p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Conversion complete</p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">Your Word document is ready</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {formatFileSize(result.size)}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      DOCX
                    </span>
                  </div>
                </div>
                <button type="button" onClick={downloadResult} className="inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 sm:w-auto">
                  Download
                </button>
              </div>
            </div>
          )}

          {error && (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          )}

          {isConverting && statusText && (
            <p className="text-center text-xs text-slate-500" aria-live="polite">{statusText}</p>
          )}

          {!isConverting && (
            <p className="text-center text-xs text-slate-500">Your file is securely uploaded, converted, and returned through iclaude&apos;s processing pipeline.</p>
          )}
        </div>
      )}
    </div>
  );
}