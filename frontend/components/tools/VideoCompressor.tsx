"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const QUALITY_OPTIONS = [
  {
    id: "high",
    label: "High quality",
    description: "Preserve more detail",
    badge: "Best quality",
    estimated: "Smaller reduction",
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "Great quality and size",
    badge: "Recommended",
    estimated: "Good reduction",
  },
  {
    id: "small",
    label: "Small size",
    description: "Prioritize a smaller file",
    badge: "Maximum compression",
    estimated: "Largest reduction",
  },
];

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function getFileExtension(name: string) {
  return name.split(".").pop()?.toUpperCase() || "VIDEO";
}

export default function VideoCompressor() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [quality, setQuality] = useState("balanced");

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

      const extension =
        selectedFile.name.split(".").pop()?.toLowerCase() || "";

      const supportedExtensions = [
        "mp4",
        "webm",
        "mov",
        "mkv",
        "avi",
      ];

      const isValid =
        selectedFile.type.startsWith("video/") ||
        supportedExtensions.includes(extension);

      if (!isValid) {
        setError(
          "That file type isn't supported. Please choose a video such as MP4, WebM, MOV, MKV or AVI.",
        );
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("Your video is larger than the 500 MB limit.");
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

  const handleReset = () => {
    clearPreview();
    setFile(null);
    setError("");
    setQuality("balanced");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const selectedQuality =
    QUALITY_OPTIONS.find((option) => option.id === quality) ??
    QUALITY_OPTIONS[1];

  return (
    <div className="w-full">
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
            "group relative overflow-hidden rounded-[28px] border transition-all duration-300",
            dragActive
              ? "border-blue-500 bg-blue-50/70 shadow-[0_20px_60px_rgba(37,99,235,0.12)]"
              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]",
          ].join(" ")}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*,.mp4,.webm,.mov,.mkv,.avi"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl transition duration-500 group-hover:bg-blue-500/10" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="relative px-6 py-12 text-center sm:px-10 sm:py-16">
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <div
                className={[
                  "relative mb-7 flex h-20 w-20 items-center justify-center rounded-[24px] transition-all duration-300",
                  dragActive
                    ? "scale-110 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-slate-950 text-white group-hover:-translate-y-1 group-hover:shadow-xl",
                ].join(" ")}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-9 w-9"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="13"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m16 10 4.5-2.5v9L16 14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 9.5h3M8 12h3M8 14.5h2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Fast browser upload
              </div>

              <h3 className="text-2xl font-black tracking-[-0.03em] text-slate-950 sm:text-3xl">
                Compress your video
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                Reduce video file size while keeping the quality you need.
                Drop your video here or select it from your device.
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl active:translate-y-0"
              >
                Choose video
                <span aria-hidden="true">→</span>
              </button>

              <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
                <span>MP4</span>
                <span>WebM</span>
                <span>MOV</span>
                <span>MKV</span>
                <span>AVI</span>
                <span>Up to 500 MB</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Preview */}
            <div className="border-b border-slate-200 bg-slate-950 p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Video ready
                    </span>
                  </div>

                  <h3 className="truncate text-base font-bold text-white">
                    {file.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span>{getFileExtension(file.name)}</span>
                    <span>•</span>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Replace
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                {previewUrl && (
                  <video
                    src={previewUrl}
                    controls
                    playsInline
                    className="aspect-video max-h-[460px] w-full object-contain"
                  >
                    Your browser does not support video playback.
                  </video>
                )}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Format
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    {getFileExtension(file.name)}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Size
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </p>
                  <p className="mt-1 text-xs font-bold text-emerald-400">
                    Ready
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                    Compression studio
                  </p>

                  <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                    Optimize your video
                  </h3>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12h16M14 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Select how aggressively you want to reduce the file size.
              </p>

              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">
                    Compression level
                  </p>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                    {selectedQuality.badge}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {QUALITY_OPTIONS.map((option) => {
                    const active = quality === option.id;

                    return (
                      <label
                        key={option.id}
                        className={[
                          "group relative flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all duration-200",
                          active
                            ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                            : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="compression-quality"
                          value={option.id}
                          checked={active}
                          onChange={(event) => setQuality(event.target.value)}
                          className="sr-only"
                        />

                        <span
                          className={[
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                            active
                              ? "border-white"
                              : "border-slate-300 group-hover:border-slate-500",
                          ].join(" ")}
                        >
                          {active && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold">
                            {option.label}
                          </span>

                          <span
                            className={[
                              "mt-0.5 block text-xs",
                              active ? "text-slate-300" : "text-slate-500",
                            ].join(" ")}
                          >
                            {option.description}
                          </span>
                        </span>

                        <span
                          className={[
                            "hidden text-[10px] font-bold uppercase tracking-wider sm:block",
                            active ? "text-slate-300" : "text-slate-400",
                          ].join(" ")}
                        >
                          {option.estimated}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
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
                    <p className="text-sm font-bold text-slate-900">
                      Your file stays private
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      The video is currently loaded locally in your browser.
                      Server-side processing will be connected later.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-7">
                <button
                  type="button"
                  disabled
                  className="group flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 py-4 text-sm font-bold text-slate-500"
                >
                  Compress video
                  <span aria-hidden="true">→</span>
                </button>

                <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                  Video encoding will become available when the processing
                  backend is connected.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Choose another video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          <span className="mt-0.5">!</span>
          <span>{error}</span>
        </div>
      )}

      {!file && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Simple",
              text: "Choose a video and compression level.",
            },
            {
              title: "Private",
              text: "Your selected file stays local for now.",
            },
            {
              title: "Flexible",
              text: "Choose quality based on your needs.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                {item.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-5 text-center text-xs leading-5 text-slate-400">
        Supports common video formats up to 500 MB. Actual compression will be
        enabled during backend integration.
      </p>
    </div>
  );
}