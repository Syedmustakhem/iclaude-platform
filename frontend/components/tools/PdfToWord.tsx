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
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function PdfToWord() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const clearPreview = useCallback(() => {
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
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

      const url = URL.createObjectURL(selectedFile);

      setFile(selectedFile);
      setPreviewUrl(url);
    },
    [clearPreview],
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleReset = () => {
    clearPreview();
    setFile(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={[
            "relative rounded-3xl border-2 border-dashed p-8 transition-all duration-200 sm:p-12",
            dragActive
              ? "border-slate-900 bg-slate-50"
              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50",
          ].join(" ")}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-red-500"
                aria-hidden="true"
              >
                <path
                  d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20V3.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M14 3.5V8h4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 13h6M9 16h4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-slate-950">
              Upload your PDF
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Drag and drop a PDF here, or choose a file from your device.
            </p>

            <button
              type="button"
              onClick={handleChooseFile}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Choose PDF
            </button>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
              <span>PDF only</span>
              <span>•</span>
              <span>Maximum 50 MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Uploaded PDF
                  </p>

                  <h3 className="mt-1 truncate text-base font-semibold text-slate-950">
                    {file.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
                >
                  Remove
                </button>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {previewUrl ? (
                  <iframe
                    src={previewUrl}
                    title={`Preview of ${file.name}`}
                    className="h-[420px] w-full"
                  />
                ) : (
                  <div className="flex h-[420px] items-center justify-center">
                    <span className="text-sm text-slate-400">
                      Preview unavailable
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col p-5 sm:p-7">
              <div>
                <div className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Frontend ready
                </div>

                <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                  Convert PDF to Word
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Your PDF upload interface is ready. The document conversion
                  engine will be connected during the backend integration
                  phase.
                </p>
              </div>

              <div className="mt-7 space-y-3">
                <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                    1
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      PDF upload
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      File selection and validation are working.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                    2
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Document conversion
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Conversion service will be connected later.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                    3
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Word download
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      The generated .docx file will be available after backend
                      integration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4 text-slate-600"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 3 5 6v5c0 4.6 2.9 8.6 7 10 4.1-1.4 7-5.4 7-10V6l-7-3Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m9.5 12 1.7 1.7 3.4-3.7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Frontend-only stage
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      The selected PDF stays in your browser during this
                      frontend-only implementation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-7">
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-xl bg-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-500"
                >
                  Conversion unavailable — backend coming next
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Choose another PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      <p className="mt-4 text-center text-xs leading-5 text-slate-400">
        Your PDF is only loaded locally for the current frontend experience.
        Backend processing will be added separately.
      </p>
    </div>
  );
}