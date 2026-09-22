"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function FileIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20V3.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 3.5V8h4M9 13h6M9 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 14.5v4A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function PdfToWord() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const clearPreview = useCallback(() => {
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const validateAndSetFile = useCallback(
    (selectedFile: File) => {
      setError("");

      const isPdf =
        selectedFile.type === "application/pdf" ||
        selectedFile.name.toLowerCase().endsWith(".pdf");

      if (!isPdf) {
        setError("Please select a PDF file.");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size must be 50 MB or smaller.");
        return;
      }

      clearPreview();
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    },
    [clearPreview],
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleReset = () => {
    clearPreview();
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragActive(false);
          }}
          className={[
            "group relative overflow-hidden rounded-[28px] border bg-white p-4 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.35)] transition-all duration-300 sm:p-6",
            dragActive
              ? "border-slate-900 bg-slate-50 ring-4 ring-slate-900/5"
              : "border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_24px_70px_-38px_rgba(15,23,42,0.42)]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-sky-100/60 blur-3xl transition-transform duration-500 group-hover:scale-110" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-indigo-100/50 blur-3xl" />

          <div className="relative rounded-[22px] border border-dashed border-slate-300 bg-slate-50/70 px-5 py-12 text-center sm:px-8 sm:py-16">
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 transition-transform duration-300 group-hover:-translate-y-1">
                <UploadIcon />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Private browser upload
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Turn a PDF into an editable Word file
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-[15px]">
                Drop your PDF here to preview it and prepare it for conversion.
                The conversion engine will be connected during backend integration.
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 active:scale-[0.98]"
              >
                Choose PDF
                <ArrowIcon />
              </button>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-400">
                <span>PDF only</span>
                <span aria-hidden="true">•</span>
                <span>Maximum 50 MB</span>
                <span aria-hidden="true">•</span>
                <span>Local preview</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <FileIcon />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Source document
                </p>
                <p className="truncate text-sm font-semibold text-slate-950 sm:text-[15px]">
                  {file.name}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 lg:mt-0">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                PDF ready
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="min-h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
              >
                Replace
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
            <div className="bg-slate-50/80 p-4 sm:p-6 lg:border-r lg:border-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">Document preview</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Review your source before conversion.
                  </p>
                </div>
                <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 sm:inline-flex">
                  {formatFileSize(file.size)}
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {previewUrl ? (
                  <iframe
                    src={previewUrl}
                    title={`Preview of ${file.name}`}
                    className="h-[430px] w-full sm:h-[520px]"
                  />
                ) : (
                  <div className="flex h-[430px] items-center justify-center text-sm text-slate-400">
                    Preview unavailable
                  </div>
                )}
              </div>
            </div>

            <aside className="flex flex-col p-5 sm:p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Conversion engine coming next
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                  PDF <span className="text-slate-400">→</span> Word
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Your frontend workflow is ready. Backend processing will create
                  the editable .docx file in the next integration phase.
                </p>
              </div>

              <div className="mt-7 space-y-2.5">
                {[
                  ["01", "Upload PDF", "File validation and local preview"],
                  ["02", "Convert document", "Processing service will be connected"],
                  ["03", "Download Word", "Generated .docx output"],
                ].map(([number, title, description], index) => (
                  <div
                    key={number}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5"
                  >
                    <div
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        index === 0
                          ? "bg-slate-950 text-white"
                          : "bg-white text-slate-400 ring-1 ring-slate-200",
                      ].join(" ")}
                    >
                      {number}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-slate-500">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 3 5 6v5c0 4.6 2.9 8.6 7 10 4.1-1.4 7-5.4 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                      <path d="m9.5 12 1.7 1.7 3.4-3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Your file stays local for now</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      This frontend-only experience loads the selected PDF in your
                      browser. No conversion request is sent yet.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  disabled
                  className="w-full min-h-12 cursor-not-allowed rounded-xl bg-slate-200 px-5 text-sm font-semibold text-slate-500"
                >
                  Convert to Word
                </button>
                <p className="mt-2 text-center text-[11px] leading-5 text-slate-400">
                  Conversion activates when the backend processing service is connected.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-3 w-full min-h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99]"
                >
                  Choose another PDF
                </button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-700"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold">
            !
          </span>
          <span>{error}</span>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-400">
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
          <path d="M12 3 5 6v5c0 4.6 2.9 8.6 7 10 4.1-1.4 7-5.4 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
        Frontend-only processing • Backend conversion will be added separately
      </div>
    </div>
  );
}
