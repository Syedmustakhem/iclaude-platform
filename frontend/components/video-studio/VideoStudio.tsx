"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { loadFFmpeg } from "@/lib/ffmpeg-loader";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

type Tab = "trim" | "compress" | "convert";
type EngineState = "idle" | "loading" | "ready" | "error";

function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[unit]}`;
}

function UploadIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </svg>
  );
}

function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
    </svg>
  );
}

function SpinnerIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} animate-spin`} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
    </svg>
  );
}

const tabs: { id: Tab; label: string; hint: string }[] = [
  { id: "trim", label: "Trim", hint: "Cut a clip" },
  { id: "compress", label: "Compress", hint: "Shrink file size" },
  { id: "convert", label: "Convert", hint: "MP4 ↔ WebM" },
];

const resolutions = [
  { value: "original", label: "Original resolution" },
  { value: "1080", label: "1080p (Full HD)" },
  { value: "720", label: "720p (HD)" },
  { value: "480", label: "480p" },
  { value: "360", label: "360p (smallest)" },
];

export default function VideoStudio() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const [engine, setEngine] = useState<EngineState>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [tab, setTab] = useState<Tab>("trim");

  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("");
  const [resultSize, setResultSize] = useState(0);

  // Trim controls
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("");
  const [trimMode, setTrimMode] = useState<"fast" | "precise">("fast");

  // Compress controls
  const [crf, setCrf] = useState(26);
  const [resolution, setResolution] = useState("720");

  // Convert controls
  const [format, setFormat] = useState<"mp4" | "webm">("mp4");

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [videoUrl, resultUrl]);

  const ensureEngine = useCallback(async (): Promise<FFmpeg> => {
    if (ffmpegRef.current) return ffmpegRef.current;
    setEngine("loading");
    try {
      const ffmpeg = await loadFFmpeg();
      ffmpegRef.current = ffmpeg;
      setEngine("ready");
      return ffmpeg;
    } catch {
      setEngine("error");
      throw new Error(
        "Could not load the video engine. Check your internet connection and try again.",
      );
    }
  }, []);

  const handleFile = useCallback(
    (next: File | null | undefined) => {
      if (!next) return;
      if (!next.type.startsWith("video/")) {
        setError("Please choose a video file (MP4, WebM, MOV…).");
        return;
      }
      setError("");
      setResultUrl(null);
      setResultName("");
      setBusy(false);
      setProgress(0);
      setStart("0");
      setEnd("");
      setDuration(0);
      setFile(next);
      setVideoUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(next);
      });
      // Warm up the engine while the user picks settings.
      void ensureEngine().catch(() => {});
    },
    [ensureEngine],
  );

  const resetAll = useCallback(() => {
    setFile(null);
    setVideoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setError("");
    setBusy(false);
    setProgress(0);
    setStatus("");
    setDuration(0);
  }, []);

  async function runFfmpeg(args: string[], inputName: string, outputName: string) {
    if (!file) return;
    setBusy(true);
    setError("");
    setProgress(0);
    setResultUrl(null);

    try {
      const ffmpeg = await ensureEngine();
      const { fetchFile } = await import("@ffmpeg/util");

      setStatus("Reading your video…");
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setStatus("Processing your video…");
      const onProgress = ({ progress: p }: { progress: number }) => {
        if (Number.isFinite(p)) setProgress(Math.min(1, Math.max(0, p)));
      };
      ffmpeg.on("progress", onProgress);
      try {
        await ffmpeg.exec(args);
      } finally {
        const ff = ffmpeg as unknown as { off?: (event: string, cb: unknown) => void };
        if (typeof ff.off === "function") ff.off("progress", onProgress);
      }

      setStatus("Preparing your download…");
      const data = (await ffmpeg.readFile(outputName)) as Uint8Array;
      try {
        await ffmpeg.deleteFile(inputName);
      } catch {
        /* ignore */
      }
      try {
        await ffmpeg.deleteFile(outputName);
      } catch {
        /* ignore */
      }

      const mimeType = outputName.endsWith(".webm") ? "video/webm" : "video/mp4";
      // TS 5.7+: ffmpeg.readFile returns Uint8Array<ArrayBufferLike>, which is
      // not assignable to BlobPart — copy into a plain Uint8Array<ArrayBuffer>.
      const blob = new Blob([new Uint8Array(data)], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultName(outputName);
      setResultSize(blob.size);
      setStatus("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Processing failed. Try a smaller file or different settings.",
      );
      setStatus("");
    } finally {
      setBusy(false);
    }
  }

  function inputNameFor(f: File): string {
    const ext = (f.name.split(".").pop() || "mp4").toLowerCase().replace(/[^a-z0-9]/g, "");
    return `input.${ext || "mp4"}`;
  }

  function baseNameFor(f: File): string {
    return f.name.replace(/\.[^.]+$/, "").replace(/[^\w\- ]+/g, "").trim() || "video";
  }

  function handleTrim() {
    if (!file || !duration) return;
    const s = Math.max(0, parseFloat(start) || 0);
    const e = end.trim() === "" ? duration : parseFloat(end);
    if (!Number.isFinite(e) || e <= s) {
      setError("End time must be after the start time.");
      return;
    }
    if (s >= duration) {
      setError("Start time is beyond the video length.");
      return;
    }
    const clampedEnd = Math.min(e, duration);
    const base = baseNameFor(file);
    const output = `${base}-trimmed.mp4`;
    const args =
      trimMode === "fast"
        ? [
            "-ss",
            String(s),
            "-i",
            inputNameFor(file),
            "-t",
            String(clampedEnd - s),
            "-c",
            "copy",
            "-avoid_negative_ts",
            "1",
            output,
          ]
        : [
            "-i",
            inputNameFor(file),
            "-ss",
            String(s),
            "-t",
            String(clampedEnd - s),
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "23",
            "-c:a",
            "aac",
            output,
          ];
    void runFfmpeg(args, inputNameFor(file), output);
  }

  function handleCompress() {
    if (!file) return;
    const base = baseNameFor(file);
    const output = `${base}-compressed.mp4`;
    const args = [
      "-i",
      inputNameFor(file),
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      String(crf),
      ...(resolution === "original" ? [] : ["-vf", `scale=-2:${resolution}`]),
      "-c:a",
      "aac",
      "-movflags",
      "+faststart",
      output,
    ];
    void runFfmpeg(args, inputNameFor(file), output);
  }

  function handleConvert() {
    if (!file) return;
    const base = baseNameFor(file);
    if (format === "mp4") {
      const output = `${base}-converted.mp4`;
      void runFfmpeg(
        [
          "-i",
          inputNameFor(file),
          "-c:v",
          "libx264",
          "-preset",
          "veryfast",
          "-crf",
          "23",
          "-c:a",
          "aac",
          "-movflags",
          "+faststart",
          output,
        ],
        inputNameFor(file),
        output,
      );
    } else {
      const output = `${base}-converted.webm`;
      void runFfmpeg(
        [
          "-i",
          inputNameFor(file),
          "-c:v",
          "libvpx-vp9",
          "-b:v",
          "0",
          "-crf",
          "32",
          "-c:a",
          "libopus",
          output,
        ],
        inputNameFor(file),
        output,
      );
    }
  }

  const engineReady = engine === "ready";

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)]">
      {/* Privacy strip */}
      <div className="flex items-center justify-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <ShieldIcon className="h-3.5 w-3.5" />
        </span>
        <p className="text-xs font-semibold text-slate-600">
          100% in-browser — your video never leaves your device. No upload, no sign-up.
        </p>
      </div>

      <div className="p-5 sm:p-8">
        {!file ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition duration-200 sm:py-20 ${
              dragOver
                ? "border-blue-500 bg-blue-50/60"
                : "border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/40"
            }`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
              <UploadIcon />
            </span>
            <span className="mt-5 text-lg font-bold text-slate-950">
              Drop a video here, or click to browse
            </span>
            <span className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              MP4, WebM, MOV and more. Works best under ~500&nbsp;MB. The video
              engine (~30&nbsp;MB) loads once and is cached for next time.
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </button>
        ) : (
          <div>
            {/* File bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-950">{file.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {formatBytes(file.size)}
                  {duration > 0 && <> · {formatTime(duration)} long</>}
                </p>
              </div>
              <button
                type="button"
                onClick={resetAll}
                disabled={busy}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-950 disabled:opacity-50"
              >
                Change file
              </button>
            </div>

            {/* Preview */}
            {videoUrl && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
                <video
                  src={videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) =>
                    setDuration(e.currentTarget.duration || 0)
                  }
                  className="max-h-[380px] w-full"
                />
              </div>
            )}

            {/* Engine status */}
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
              {engine === "loading" && (
                <>
                  <SpinnerIcon className="text-blue-600" />
                  <span className="text-slate-600">
                    Loading the video engine… (one-time download, ~30&nbsp;MB)
                  </span>
                </>
              )}
              {engine === "ready" && (
                <>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-emerald-700">Video engine ready</span>
                </>
              )}
              {engine === "error" && (
                <span className="text-rose-600">
                  Engine failed to load — check your connection and re-select the file.
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1.5">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  disabled={busy}
                  className={`rounded-xl px-3 py-3 text-center transition duration-200 disabled:opacity-60 ${
                    tab === t.id
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="block text-sm font-bold">{t.label}</span>
                  <span className="mt-0.5 hidden text-[11px] sm:block">{t.hint}</span>
                </button>
              ))}
            </div>

            {/* Panels */}
            <div className="mt-5 rounded-2xl border border-slate-200 p-5 sm:p-6">
              {tab === "trim" && (
                <div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Start (seconds)
                      </span>
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={start}
                        disabled={busy}
                        onChange={(e) => setStart(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        End (seconds, blank = full video)
                      </span>
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={end}
                        placeholder={duration > 0 ? formatTime(duration) : "e.g. 45"}
                        disabled={busy}
                        onChange={(e) => setEnd(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                      />
                    </label>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {(
                      [
                        { id: "fast", label: "Fast cut", hint: "Instant, cuts on keyframes" },
                        { id: "precise", label: "Precise cut", hint: "Frame-accurate, slower" },
                      ] as const
                    ).map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        disabled={busy}
                        onClick={() => setTrimMode(mode.id)}
                        className={`rounded-xl border px-4 py-3 text-left transition disabled:opacity-60 ${
                          trimMode === mode.id
                            ? "border-blue-500 bg-blue-50/60"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="block text-sm font-bold text-slate-950">{mode.label}</span>
                        <span className="mt-0.5 block text-xs text-slate-500">{mode.hint}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleTrim}
                    disabled={busy || !engineReady || !duration}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 disabled:translate-y-0 disabled:opacity-50 sm:w-auto"
                  >
                    {busy && <SpinnerIcon />}
                    {busy ? "Trimming…" : "Trim video"}
                  </button>
                </div>
              )}

              {tab === "compress" && (
                <div>
                  <label className="block">
                    <span className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                      Quality
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700">
                        {crf <= 20 ? "High quality" : crf <= 28 ? "Balanced" : "Smallest size"}
                      </span>
                    </span>
                    <input
                      type="range"
                      min={18}
                      max={35}
                      value={crf}
                      disabled={busy}
                      onChange={(e) => setCrf(Number(e.target.value))}
                      className="mt-3 w-full accent-blue-600"
                    />
                    <span className="mt-1 flex justify-between text-[11px] font-semibold text-slate-400">
                      <span>Smaller file</span>
                      <span>Better quality</span>
                    </span>
                  </label>
                  <label className="mt-5 block">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Resolution
                    </span>
                    <select
                      value={resolution}
                      disabled={busy}
                      onChange={(e) => setResolution(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                    >
                      {resolutions.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={handleCompress}
                    disabled={busy || !engineReady}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 disabled:translate-y-0 disabled:opacity-50 sm:w-auto"
                  >
                    {busy && <SpinnerIcon />}
                    {busy ? "Compressing…" : "Compress video"}
                  </button>
                </div>
              )}

              {tab === "convert" && (
                <div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {(
                      [
                        { id: "mp4", label: "MP4 (H.264)", hint: "Plays everywhere" },
                        { id: "webm", label: "WebM (VP9)", hint: "Great for the web" },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        disabled={busy}
                        onClick={() => setFormat(f.id)}
                        className={`rounded-xl border px-4 py-3 text-left transition disabled:opacity-60 ${
                          format === f.id
                            ? "border-blue-500 bg-blue-50/60"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="block text-sm font-bold text-slate-950">{f.label}</span>
                        <span className="mt-0.5 block text-xs text-slate-500">{f.hint}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleConvert}
                    disabled={busy || !engineReady}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 disabled:translate-y-0 disabled:opacity-50 sm:w-auto"
                  >
                    {busy && <SpinnerIcon />}
                    {busy ? "Converting…" : `Convert to ${format.toUpperCase()}`}
                  </button>
                </div>
              )}
            </div>

            {/* Progress */}
            {busy && (
              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                  <span className="inline-flex items-center gap-2">
                    <SpinnerIcon className="text-blue-600" />
                    {status || "Working…"}
                  </span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-500 transition-[width] duration-300"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Keep this tab open — processing happens on your device.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
                {error}
              </div>
            )}

            {/* Result */}
            {resultUrl && !busy && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/60">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-sm font-bold text-slate-950">Your video is ready</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {resultName} · {formatBytes(resultSize)}
                    </p>
                  </div>
                  <a
                    href={resultUrl}
                    download={resultName}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    <DownloadIcon />
                    Download video
                  </a>
                </div>
                <div className="border-t border-emerald-100 bg-slate-950">
                  <video src={resultUrl} controls playsInline preload="metadata" className="max-h-[320px] w-full" />
                </div>
              </div>
            )}
          </div>
        )}

        {error && !file && (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
