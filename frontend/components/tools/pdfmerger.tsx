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
  inputFileIds?: string[];
  outputFileId?: string;
  error?: { code: string; message: string };
};

type PendingFile = {
  id: string;
  file: File;
};

type MergeResult = {
  url: string;
  size: number;
  filename: string;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8787/api"
).replace(/\/+$/, "");

const ACCEPTED_TYPES = ["application/pdf"];

const MAX_TOTAL_SIZE = 150 * 1024 * 1024;

const MIN_FILES = 2;
const MAX_FILES = 50;

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

export default function PdfMerger() {
  const inputRef = useRef<HTMLInputElement>(null);
  const resultUrlRef = useRef<string | null>(null);
  const dragIndexRef = useRef<number | null>(null);

  const [files, setFiles] = useState<PendingFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<MergeResult | null>(null);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);

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
    setProgress(0);
  }

  const totalSize = files.reduce((sum, item) => sum + item.file.size, 0);

  function addFiles(selected: FileList | File[]) {
    setError("");
    clearResult();

    const incoming = Array.from(selected);

    const rejected = incoming.filter(
      (file) => !ACCEPTED_TYPES.includes(file.type),
    );

    if (rejected.length > 0) {
      setError("Only PDF files are supported. Some files were skipped.");
    }

    const accepted = incoming.filter((file) =>
      ACCEPTED_TYPES.includes(file.type),
    );

    setFiles((current) => {
      const combined = [
        ...current,
        ...accepted.map((file) => ({
          id: crypto.randomUUID(),
          file,
        })),
      ];

      if (combined.length > MAX_FILES) {
        setError(`No more than ${MAX_FILES} files can be merged at once.`);
        return combined.slice(0, MAX_FILES);
      }

      return combined;
    });
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      addFiles(event.target.files);
    }
    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDropZoneActive(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDropZoneActive(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDropZoneActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  }

  function removeFile(id: string) {
    if (isMerging) return;
    setError("");
    clearResult();
    setFiles((current) => current.filter((item) => item.id !== id));
  }

  function handleItemDragStart(index: number) {
    if (isMerging) return;
    dragIndexRef.current = index;
  }

  function handleItemDragOver(
    event: DragEvent<HTMLDivElement>,
    index: number,
  ) {
    event.preventDefault();

    const fromIndex = dragIndexRef.current;

    if (fromIndex === null || fromIndex === index) {
      return;
    }

    setFiles((current) => {
      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });

    dragIndexRef.current = index;
  }

  function handleItemDragEnd() {
    dragIndexRef.current = null;
  }

  async function mergeFiles() {
    if (files.length < MIN_FILES) {
      setError(`Please add at least ${MIN_FILES} PDF files.`);
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      setError(
        `The combined size of your files (${formatFileSize(totalSize)}) exceeds the ${formatFileSize(MAX_TOTAL_SIZE)} limit.`,
      );
      return;
    }

    setError("");
    setIsMerging(true);
    setProgress(2);
    clearResult();

    try {
      const sessionId = getSessionId();
      const fileIds: string[] = [];

      for (let index = 0; index < files.length; index += 1) {
        const { file } = files[index];

        setStatusText(
          `Uploading ${index + 1} of ${files.length}: ${file.name}`,
        );

        const presignResponse = await fetch(`${API_BASE_URL}/uploads/presign`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            size: file.size,
            tool: "merge-pdf",
            sessionId,
          }),
        });
        const presign = await parseApiResponse<PresignResponse>(presignResponse);
        if (!presign.data) throw new Error(`The upload URL for "${file.name}" was not returned.`);

        const uploadResponse = await fetch(presign.data.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!uploadResponse.ok) {
          throw new Error(`Uploading "${file.name}" failed (${uploadResponse.status}).`);
        }

        const confirmResponse = await fetch(`${API_BASE_URL}/uploads/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            objectKey: presign.data.objectKey,
            filename: file.name,
            contentType: file.type,
            size: file.size,
            tool: "merge-pdf",
            sessionId,
          }),
        });
        const confirmation = await parseApiResponse<ConfirmResponse>(confirmResponse);
        if (!confirmation.data?.fileId) {
          throw new Error(`"${file.name}" could not be confirmed after upload.`);
        }

        fileIds.push(confirmation.data.fileId);

        setProgress(
          Math.min(60, Math.round(((index + 1) / files.length) * 60)),
        );
      }

      setStatusText("Creating merge job...");

      const jobResponse = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "merge-pdf",
          fileIds,
          sessionId,
        }),
      });

      const job = await parseApiResponse<JobResponse>(jobResponse);
      if (!job.data?.jobId) throw new Error("The merge job could not be created.");

      const jobId = job.data.jobId;
      setProgress(65);
      setStatusText("Merging PDFs...");

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
          throw new Error(currentJob.error?.message || "PDF merge failed.");
        }
        if (currentJob.status === "completed") {
          completedJob = currentJob;
          setProgress(95);
          setStatusText("Finalizing...");
          break;
        }

        const backendProgress = currentJob.progress ?? 0;
        setProgress(Math.min(90, 65 + Math.round(backendProgress * 0.25)));
      }

      if (!completedJob) {
        throw new Error("This is taking longer than expected. Please try again.");
      }
      if (!completedJob.outputFileId) {
        throw new Error("The merge completed but no output file was returned.");
      }

      const downloadResponse = await fetch(
        `${API_BASE_URL}/files/${encodeURIComponent(completedJob.outputFileId)}/download`,
      );
      if (!downloadResponse.ok) {
        throw new Error(`Unable to retrieve the merged PDF (${downloadResponse.status}).`);
      }

      const outputBlob = await downloadResponse.blob();
      if (outputBlob.size === 0) throw new Error("The server returned an empty PDF.");

      const outputUrl = URL.createObjectURL(outputBlob);
      resultUrlRef.current = outputUrl;

      setResult({
        url: outputUrl,
        size: outputBlob.size,
        filename: "merged.pdf",
      });
      setProgress(100);
      setStatusText("Merge complete.");
    } catch (mergeError) {
      console.error("PDF merge failed:", mergeError);
      setProgress(0);
      setStatusText("");
      setError(
        mergeError instanceof Error
          ? mergeError.message
          : "Something went wrong while merging your PDFs. Please try again.",
      );
    } finally {
      setIsMerging(false);
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
    setFiles([]);
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
        multiple
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Choose PDF files to merge"
      />

      {files.length === 0 ? (
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
            isDropZoneActive
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
              {isDropZoneActive ? "Release to add files" : "Secure server processing"}
            </span>
            <h3 className="mt-4 text-[1.45rem] font-black tracking-[-0.03em] text-slate-950 sm:text-2xl">
              {isDropZoneActive ? "Drop your PDFs here" : "Upload PDF files"}
            </h3>
            <p className="mt-3 max-w-md text-[13px] leading-6 text-slate-500 sm:text-sm">
              Select two or more PDFs to combine into a single document.
            </p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
            >
              Choose PDFs
            </button>
            <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
              PDF only • Up to {MAX_FILES} files • {formatFileSize(MAX_TOTAL_SIZE)} combined limit
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                  {files.length} file{files.length === 1 ? "" : "s"} selected
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Combined size: {formatFileSize(totalSize)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={isMerging || files.length >= MAX_FILES}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add more
              </button>
            </div>

            <p className="mt-4 text-[11px] font-semibold text-slate-400">
              Drag to reorder — files merge in the order shown below.
            </p>

            <div className="mt-3 space-y-2">
              {files.map((item, index) => (
                <div
                  key={item.id}
                  draggable={!isMerging}
                  onDragStart={() => handleItemDragStart(index)}
                  onDragOver={(event) => handleItemDragOver(event, index)}
                  onDragEnd={handleItemDragEnd}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 transition hover:border-blue-200 hover:bg-white"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm active:cursor-grabbing"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="8" cy="6" r="1.2" fill="currentColor" stroke="none" />
                      <circle cx="8" cy="12" r="1.2" fill="currentColor" stroke="none" />
                      <circle cx="8" cy="18" r="1.2" fill="currentColor" stroke="none" />
                      <circle cx="16" cy="6" r="1.2" fill="currentColor" stroke="none" />
                      <circle cx="16" cy="12" r="1.2" fill="currentColor" stroke="none" />
                      <circle cx="16" cy="18" r="1.2" fill="currentColor" stroke="none" />
                    </svg>
                  </span>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5V8h4.5" />
                    </svg>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-slate-900">
                      {index + 1}. {item.file.name}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-slate-500">
                      {formatFileSize(item.file.size)}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFile(item.id)}
                    disabled={isMerging}
                    aria-label={`Remove ${item.file.name}`}
                    className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {isMerging && (
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
              onClick={mergeFiles}
              disabled={isMerging || files.length < MIN_FILES}
              className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isMerging ? "Merging..." : `Merge ${files.length} PDFs`}
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={isMerging}
              className="mt-3 min-h-11 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Start over
            </button>
          </div>

          {result && (
            <div className="rounded-[28px] border border-emerald-200 bg-emerald-50/60 p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Merge complete</p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">Your merged PDF is ready</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {formatFileSize(result.size)}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      PDF
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

          {!isMerging && (
            <p className="text-center text-xs text-slate-500">Your files are securely uploaded, merged, and returned through iclaude&apos;s processing pipeline.</p>
          )}
        </div>
      )}
    </div>
  );
}