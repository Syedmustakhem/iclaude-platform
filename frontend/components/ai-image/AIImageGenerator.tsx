"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Base URL of the backend API. Override per
 * environment with NEXT_PUBLIC_API_URL. The
 * value may or may not end with `/api` — the
 * trailing prefix is normalized away here so
 * request paths never double it up
 * (`/api/api/...` caused a 404 on 2026-09-28).
 */
const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.iclaude.in"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const MAX_PROMPT_LENGTH = 500;

/**
 * Free daily allowance, mirrored from the backend
 * (MAX_AI_IMAGES_PER_SESSION_PER_DAY). Displayed
 * so visitors know the limit up front.
 */
const DAILY_FREE_LIMIT = 5;

const STYLES = [
  { key: "none", label: "No style" },
  { key: "photorealistic", label: "Photorealistic" },
  { key: "digital-art", label: "Digital art" },
  { key: "watercolor", label: "Watercolor" },
  { key: "anime", label: "Anime" },
  { key: "3d-render", label: "3D render" },
  { key: "minimalist", label: "Minimalist" },
] as const;

const SIZES = [
  { key: "square", label: "Square", hint: "1024 × 1024" },
  { key: "wide", label: "Wide", hint: "1280 × 720" },
  { key: "tall", label: "Tall", hint: "768 × 1152" },
] as const;

const LOADING_MESSAGES = [
  "Warming up the image engine…",
  "Dreaming up pixels…",
  "Adding details…",
  "Almost there…",
];

type Status = "idle" | "loading" | "done" | "error";

/**
 * Anonymous session id, shared with the other
 * tools' rate limiting. Stored in localStorage so
 * the daily cap follows the visitor.
 */
function getSessionId(): string {
  if (typeof window === "undefined") {
    return "anonymous";
  }

  const KEY = "iclaude-session-id";
  let id = window.localStorage.getItem(KEY);

  if (!id) {
    id =
      typeof crypto !== "undefined" &&
      "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`;

    window.localStorage.setItem(KEY, id);
  }

  return id;
}

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] =
    useState<(typeof STYLES)[number]["key"]>("none");
  const [size, setSize] =
    useState<(typeof SIZES)[number]["key"]>("square");
  const [status, setStatus] = useState<Status>("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(
    null,
  );
  const [wasCached, setWasCached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(
    LOADING_MESSAGES[0],
  );

  const messageTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (messageTimer.current !== null) {
        window.clearInterval(messageTimer.current);
      }
    };
  }, []);

  function cycleLoadingMessages() {
    let index = 0;

    messageTimer.current = window.setInterval(() => {
      index =
        (index + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[index]);
    }, 9000);
  }

  async function handleGenerate() {
    const trimmed = prompt.trim();

    if (!trimmed || status === "loading") {
      return;
    }

    setStatus("loading");
    setError(null);
    setImageUrl(null);
    setWasCached(false);
    setLoadingMessage(LOADING_MESSAGES[0]);
    cycleLoadingMessages();

    try {
      const res = await fetch(
        `${API_BASE}/api/ai-image/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: trimmed,
            sessionId: getSessionId(),
            style,
            size,
          }),
        },
      );

      const json = (await res.json()) as {
        success: boolean;
        data?: {
          fileId: string;
          downloadUrl: string;
          cached: boolean;
        };
        error?: { code: string; message: string };
      };

      if (!json.success || !json.data) {
        const code = json.error?.code ?? "";

        setError(
          code === "AI_IMAGE_LIMIT_REACHED"
            ? `You've used your ${DAILY_FREE_LIMIT} free images for today. Come back tomorrow for more.`
            : code === "AI_GENERATION_FAILED"
              ? "The image service is busy right now. Please try again in a moment."
              : (json.error?.message ??
                "Something went wrong. Please try again."),
        );
        setStatus("error");
        return;
      }

      setImageUrl(
        `${API_BASE}${json.data.downloadUrl}`,
      );
      setWasCached(json.data.cached);
      setStatus("done");
    } catch {
      setError(
        "Could not reach the image service. Check your connection and try again.",
      );
      setStatus("error");
    } finally {
      if (messageTimer.current !== null) {
        window.clearInterval(messageTimer.current);
        messageTimer.current = null;
      }
    }
  }

  function handleReset() {
    setStatus("idle");
    setImageUrl(null);
    setError(null);
    setPrompt("");
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          AI image generator
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {DAILY_FREE_LIMIT} free images per day — no
          sign-up.
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <label
          htmlFor="ai-prompt"
          className="text-sm font-bold text-slate-900"
        >
          Describe your image
        </label>
        <textarea
          id="ai-prompt"
          value={prompt}
          onChange={(event) =>
            setPrompt(
              event.target.value.slice(
                0,
                MAX_PROMPT_LENGTH,
              ),
            )
          }
          rows={3}
          placeholder="A red fox sitting in a snowy pine forest at sunrise…"
          disabled={status === "loading"}
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-[15px] leading-7 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
        />
        <p className="mt-1 text-right text-xs text-slate-400">
          {prompt.length}/{MAX_PROMPT_LENGTH}
        </p>

        <p className="mt-5 text-sm font-bold text-slate-900">
          Style
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {STYLES.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setStyle(option.key)}
              disabled={status === "loading"}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${
                style === option.key
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm font-bold text-slate-900">
          Size
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {SIZES.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setSize(option.key)}
              disabled={status === "loading"}
              className={`rounded-2xl border px-3 py-3 text-center transition disabled:opacity-60 ${
                size === option.key
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="block text-sm font-bold">
                {option.label}
              </span>
              <span
                className={`mt-0.5 block text-xs ${
                  size === option.key
                    ? "text-slate-300"
                    : "text-slate-400"
                }`}
              >
                {option.hint}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={
            status === "loading" ||
            prompt.trim().length === 0
          }
          className="mt-6 w-full rounded-2xl bg-blue-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading"
            ? "Generating…"
            : "Generate image"}
        </button>

        {status === "loading" && (
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-6 text-center">
            <div
              className="mx-auto h-8 w-8 animate-spin rounded-full border-[3px] border-blue-200 border-t-blue-600"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-bold text-slate-800">
              {loadingMessage}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Free rendering can take up to a minute —
              please keep this tab open.
            </p>
          </div>
        )}

        {status === "error" && error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/70 px-5 py-4">
            <p className="text-sm font-semibold leading-7 text-red-800">
              {error}
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              className="mt-3 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-700 transition hover:border-red-300"
            >
              Try again
            </button>
          </div>
        )}

        {status === "done" && imageUrl && (
          <div className="mt-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={prompt}
                className="mx-auto max-h-[480px] w-auto"
              />
            </div>
            {wasCached && (
              <p className="mt-2 text-xs text-slate-400">
                Served instantly from cache — someone
                generated this exact image before.
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={imageUrl}
                download="iclaude-ai-image.jpg"
                className="flex-1 rounded-2xl bg-slate-950 px-6 py-3.5 text-center text-sm font-black text-white transition hover:bg-slate-800"
              >
                Download image
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-700 transition hover:border-slate-300"
              >
                Generate another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
