"use client";

import { useEffect, useRef, useState } from "react";
import {
  CATEGORIES,
  TOOLS,
  toolsByCategory,
  type TappyTool,
} from "./tappy-tools";
import { runJobTool } from "./tappy-api";
import {
  CONFUSED_CHIPS,
  confusedGuidance,
  findToolsFor,
  smallTalk,
} from "./tappy-brain";
import "./tappy-animations.css";

type Msg = {
  id: number;
  from: "tappy" | "user";
  text: string;
  imageUrl?: string;
  downloadUrl?: string;
  downloadName?: string;
  linkHref?: string;
  linkLabel?: string;
};

type Chip = { label: string; value: string; isTool: boolean };

type Stage =
  | "menu"
  | "options"
  | "textinput"
  | "file"
  | "working";

let nextId = 1;
const nid = () => nextId++;

function extractYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return m ? m[1] : null;
}

const YT_QUALS = [
  { key: "maxresdefault", label: "Full HD" },
  { key: "sddefault", label: "SD" },
  { key: "hqdefault", label: "High" },
  { key: "mqdefault", label: "Medium" },
];

async function downloadRemote(url: string, filename: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("fetch failed");
    const blob = await res.blob();
    const obj = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = obj;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(obj), 5000);
  } catch {
    window.open(url, "_blank", "noopener");
  }
}

export default function TappyChat() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [stage, setStage] = useState<Stage>("menu");
  const [tool, setTool] = useState<TappyTool | null>(null);
  const [optionValues, setOptionValues] = useState<
    Record<string, string | number>
  >({});
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [busy, setBusy] = useState(false);
  const [avatarAnim, setAvatarAnim] = useState("tappy-bob");
  const [btnAnim, setBtnAnim] = useState("tappy-bob");

  const fileRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chips, stage, progress]);

  // Tappy nods while busy, bobs when idle — but never interrupts a
  // celebrate / wave / head-turn that is already playing.
  useEffect(() => {
    if (!open) return;
    if (busy) {
      setAvatarAnim("tappy-nod");
    } else {
      setAvatarAnim((cur) =>
        cur === "tappy-nod" ? "tappy-bob" : cur,
      );
    }
  }, [busy, open]);

  // Floating button waves every few seconds to say hello.
  useEffect(() => {
    if (open) return;
    const id = setInterval(() => {
      setBtnAnim("tappy-wave");
      setTimeout(() => setBtnAnim("tappy-bob"), 1600);
    }, 9000);
    return () => clearInterval(id);
  }, [open ]);

  function celebrate() {
    setAvatarAnim("tappy-celebrate");
    setTimeout(() => setAvatarAnim("tappy-bob"), 1400);
  }

  function lookConfused() {
    setAvatarAnim("tappy-look");
    setTimeout(() => setAvatarAnim("tappy-bob"), 3400);
  }

  function push(msg: Omit<Msg, "id">) {
    setMessages((m) => [...m, { ...msg, id: nid() }]);
  }

  function tappySay(text: string) {
    push({ from: "tappy", text });
  }

  function openChat() {
    setOpen(true);
    if (!greeted) {
      setGreeted(true);
      setAvatarAnim("tappy-wave");
      setTimeout(() => setAvatarAnim("tappy-bob"), 1600);
      tappySay(
        "Hey, I'm Tappy! 👋 I can run all of iclaude's tools right here in the chat. Pick one below, or just tell me what you want to do.",
      );
      setStage("menu");
    }
  }

  function backToMenu() {
    setTool(null);
    setChips([]);
    setStage("menu");
    tappySay("What shall we do next? Pick a tool 👇");
  }

  function selectTool(t: TappyTool) {
    setTool(t);
    setChips([]);
    push({ from: "user", text: t.name });

    if (t.handler === "link") {
      push({
        from: "tappy",
        text: `${t.name} needs its own workspace for the best experience.`,
        linkHref: t.href,
        linkLabel: `Open ${t.name} →`,
      });
      setStage("menu");
      setChips([
        { label: "↩ All tools", value: "__menu", isTool: false },
      ]);
      return;
    }

    tappySay(t.helpText);

    if (t.optionFields.length > 0) {
      const defaults: Record<string, string | number> = {};
      for (const f of t.optionFields) defaults[f.key] = f.defaultValue;
      setOptionValues(defaults);
      setStage("options");
    } else {
      goToInput(t);
    }
  }

  function goToInput(t: TappyTool) {
    if (t.handler === "job") setStage("file");
    else setStage("textinput");
  }

  function handleChip(chip: Chip) {
    if (chip.value === "__menu") {
      backToMenu();
      return;
    }
    if (chip.isTool) {
      const t = TOOLS.find((x) => x.slug === chip.value);
      if (t) selectTool(t);
      return;
    }
    sendUserText(chip.value);
  }

  function sendUserText(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    push({ from: "user", text: clean });
    setInput("");
    setChips([]);

    const talk = smallTalk(clean);
    if (talk) {
      tappySay(talk);
      return;
    }

    const found = findToolsFor(clean);
    if (found.length === 1) {
      selectTool(found[0]);
      return;
    }
    if (found.length > 1) {
      tappySay("I found a few things that could help — which one?");
      setChips(
        found.slice(0, 4).map((t) => ({
          label: t.name,
          value: t.slug,
          isTool: true,
        })),
      );
      return;
    }

    // Confused path — guide them gently.
    tappySay(confusedGuidance(clean));
    setChips(
      CONFUSED_CHIPS.map((c) => ({
        label: c.label,
        value: c.reply,
        isTool: false,
      })),
    );
  }

  async function submitTextInput() {
    if (!tool || !tool.textInput || busy) return;
    const value = input.trim();
    if (!value) return;
    push({ from: "user", text: value });
    setInput("");
    setBusy(true);
    setStage("working");

    try {
      if (tool.handler === "qr") {
        setStatusText("Making your QR code…");
        const QRCode = await import("qrcode");
        const dataUrl = await QRCode.toDataURL(value, {
          width: 512,
          margin: 2,
        });
        push({
          from: "tappy",
          text: "Here's your QR code! 📱",
          imageUrl: dataUrl,
          downloadUrl: dataUrl,
          downloadName: "tappy-qr.png",
        });
        celebrate();
      } else if (tool.handler === "youtube") {
        setStatusText("Finding that video…");
        const id = extractYouTubeId(value);
        if (!id) {
          throw new Error(
            "That doesn't look like a YouTube link. Paste the full video URL.",
          );
        }
        push({
          from: "tappy",
          text: "Got it! Tap a quality to save the thumbnail:",
          imageUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        });
        setChips(
          YT_QUALS.map((q) => ({
            label: `⬇ ${q.label}`,
            value: `__yt:${id}:${q.key}:${q.label}`,
            isTool: false,
          })),
        );
        celebrate();
      } else if (tool.handler === "ai-image") {
        setStatusText("Dreaming up your image… (takes ~15 seconds)");
        const seed = Math.floor(Math.random() * 999999);
        const url =
          `https://image.pollinations.ai/prompt/${encodeURIComponent(value)}` +
          `?width=1024&height=1024&nologo=true&seed=${seed}`;
        // Warm it up so the message shows a loaded image.
        await fetch(url, { mode: "no-cors" }).catch(() => {});
        push({
          from: "tappy",
          text: "Here's what I made for you! ✨",
          imageUrl: url,
          downloadUrl: url,
          downloadName: "tappy-ai-image.jpg",
        });
        celebrate();
      }
    } catch (e) {
      lookConfused();
      tappySay(
        e instanceof Error
          ? `Hmm, that didn't work: ${e.message}`
          : "Hmm, that didn't work. Want to try again?",
      );
    } finally {
      setBusy(false);
      setStage("menu");
      setChips([
        { label: "↩ All tools", value: "__menu", isTool: false },
      ]);
    }
  }

  function onFilesPicked(files: FileList | null) {
    if (!tool || !files || files.length === 0 || busy) return;

    const picked = Array.from(files);
    const acceptList = tool.accepts
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    for (const f of picked) {
      const type = f.type.toLowerCase();
      const ok =
        acceptList.length === 0 ||
        acceptList.some(
          (a) =>
            type === a ||
            (a.endsWith("/*") &&
              type.startsWith(a.slice(0, -1))),
        );
      if (!ok) {
        tappySay(
          `That file type (${f.type || "unknown"}) doesn't work with ${tool.name}. Try ${tool.accepts.replace(/,/g, ", ")}.`,
        );
        return;
      }
      if (f.size > tool.maxSizeMB * 1024 * 1024) {
        tappySay(
          `That file is bigger than ${tool.maxSizeMB} MB, which is the limit for ${tool.name}.`,
        );
        return;
      }
    }

    if (!tool.multiple && picked.length > 1) {
      tappySay(
        `${tool.name} takes one file at a time — I'll use the first one.`,
      );
    }

    const useFiles = tool.multiple
      ? picked
      : picked.slice(0, 1);
    push({
      from: "user",
      text: `📎 ${useFiles.map((f) => f.name).join(", ")}`,
    });
    void runTool(useFiles);
  }

  async function runTool(files: File[]) {
    if (!tool) return;
    setBusy(true);
    setStage("working");
    setProgress(0);

    try {
      const options = tool.buildOptions
        ? tool.buildOptions(optionValues)
        : undefined;
      const result = await runJobTool(
        tool.slug,
        files,
        options,
        (p, label) => {
          setProgress(p);
          setStatusText(label);
        },
      );
      const url = URL.createObjectURL(result.blob);
      const isImage = result.mime.startsWith("image/");
      push({
        from: "tappy",
        text: isImage
          ? "Done! Here's your file 🎉"
          : "Done! Your file is ready 🎉",
        imageUrl: isImage ? url : undefined,
        downloadUrl: url,
        downloadName: result.filename,
      });
      celebrate();
    } catch (e) {
      lookConfused();
      tappySay(
        e instanceof Error
          ? `Something went wrong: ${e.message}`
          : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
      setStage("menu");
      setChips([
        { label: "↩ All tools", value: "__menu", isTool: false },
      ]);
    }
  }

  async function handleSpecialChip(value: string) {
    if (value.startsWith("__yt:")) {
      const [, id, key, label] = value.split(":");
      const url = `https://i.ytimg.com/vi/${id}/${key}.jpg`;
      await downloadRemote(url, `youtube-thumbnail-${label}.jpg`);
    }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          type="button"
          onClick={openChat}
          aria-label="Chat with Tappy"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_12px_40px_rgba(15,23,42,0.25)] ring-1 ring-slate-200 transition hover:-translate-y-0.5"
        >
          <img
            src="/tappy.png"
            alt="Tappy"
            className={`h-11 w-11 rounded-full object-cover ${btnAnim}`}
          />
          <span className="text-left">
            <span className="block text-sm font-extrabold text-slate-900">
              Tappy
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              Ask me anything
            </span>
          </span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[min(620px,calc(100dvh-3rem))] w-[min(384px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.3)] ring-1 ring-slate-200">
          {/* Header */}
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-3.5">
            <img
              src="/tappy.png"
              alt="Tappy"
              className={`h-10 w-10 rounded-full bg-white object-cover ${avatarAnim}`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-white">
                Tappy
              </p>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online — replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={backToMenu}
              aria-label="All tools"
              className="rounded-lg px-2 py-1.5 text-[11px] font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Tools
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    m.from === "user"
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md bg-white text-slate-800 ring-1 ring-slate-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.imageUrl}
                      alt="Result"
                      className="mt-2 max-h-56 w-full rounded-xl object-contain"
                    />
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.downloadUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          const a =
                            document.createElement("a");
                          a.href =
                            m.downloadUrl as string;
                          a.download =
                            m.downloadName ||
                            "tappy-result";
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800"
                      >
                        ⬇ Download
                      </button>
                    )}
                    {m.linkHref && (
                      <a
                        href={m.linkHref}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700"
                      >
                        {m.linkLabel || "Open →"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Context panel */}
            {stage === "menu" && !busy && (
              <div className="space-y-3">
                {CATEGORIES.map((cat) => (
                  <div key={cat}>
                    <p className="mb-1.5 px-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      {cat}
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {toolsByCategory(cat).map((t) => (
                        <button
                          key={t.slug}
                          type="button"
                          onClick={() => selectTool(t)}
                          className="flex items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-2.5 text-left ring-1 ring-slate-200 transition hover:-translate-y-px hover:ring-blue-300"
                        >
                          <span>
                            <span className="block text-[13px] font-bold text-slate-900">
                              {t.name}
                            </span>
                            <span className="block text-[11px] text-slate-500">
                              {t.tagline}
                            </span>
                          </span>
                          <span className="text-slate-300">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {stage === "options" && tool && (
              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
                  {tool.name} — options
                </p>
                <div className="mt-3 space-y-3">
                  {tool.optionFields.map((f) =>
                    f.kind === "select" ? (
                      <label key={f.key} className="block">
                        <span className="text-xs font-bold text-slate-600">
                          {f.label}
                        </span>
                        <select
                          value={String(
                            optionValues[f.key] ??
                              f.defaultValue,
                          )}
                          onChange={(e) =>
                            setOptionValues((v) => ({
                              ...v,
                              [f.key]: e.target.value,
                            }))
                          }
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                        >
                          {f.options.map((o) => (
                            <option
                              key={o.value}
                              value={o.value}
                            >
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : (
                      <label key={f.key} className="block">
                        <span className="text-xs font-bold text-slate-600">
                          {f.label}
                        </span>
                        <input
                          type="number"
                          min={f.min}
                          max={f.max}
                          value={Number(
                            optionValues[f.key] ??
                              f.defaultValue,
                          )}
                          onChange={(e) =>
                            setOptionValues((v) => ({
                              ...v,
                              [f.key]: e.target.value,
                            }))
                          }
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500"
                        />
                      </label>
                    ),
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => tool && goToInput(tool)}
                  className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Continue →
                </button>
              </div>
            )}

            {stage === "textinput" && tool?.textInput && (
              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-xs font-bold text-slate-600">
                  {tool.textInput.label}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  …or type it in the chat box below 👇
                </p>
              </div>
            )}

            {stage === "file" && tool && (
              <div className="rounded-2xl bg-white p-4 text-center ring-1 ring-slate-200">
                <input
                  ref={fileRef}
                  type="file"
                  accept={tool.accepts}
                  multiple={tool.multiple}
                  className="sr-only"
                  onChange={(e) => {
                    onFilesPicked(e.target.files);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  📎 Choose{" "}
                  {tool.multiple ? "file(s)" : "file"}
                </button>
                <p className="mt-2 text-[11px] text-slate-400">
                  {tool.accepts
                    .replace(/image\//g, "")
                    .replace(/,/g, ", ")
                    .toUpperCase()}{" "}
                  • up to {tool.maxSizeMB} MB
                  {tool.multiple
                    ? " • you can pick several"
                    : ""}
                </p>
              </div>
            )}

            {stage === "working" && (
              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{statusText || "Working…"}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Quick-reply chips */}
            {chips.length > 0 && !busy && (
              <div className="flex flex-wrap gap-1.5">
                {chips.map((chip, i) => (
                  <button
                    key={`${chip.value}-${i}`}
                    type="button"
                    onClick={() => {
                      if (chip.value.startsWith("__yt:")) {
                        void handleSpecialChip(chip.value);
                      } else {
                        handleChip(chip);
                      }
                    }}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-100"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-slate-200 bg-white px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                disabled={busy}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (
                      stage === "textinput" &&
                      tool?.textInput
                    ) {
                      void submitTextInput();
                    } else {
                      sendUserText(input);
                    }
                  }
                }}
                placeholder={
                  stage === "textinput" && tool?.textInput
                    ? tool.textInput.placeholder
                    : "Type a message…"
                }
                className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white disabled:opacity-60"
              />
              <button
                type="button"
                disabled={busy || !input.trim()}
                onClick={() => {
                  if (
                    stage === "textinput" &&
                    tool?.textInput
                  ) {
                    void submitTextInput();
                  } else {
                    sendUserText(input);
                  }
                }}
                aria-label="Send"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-40"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h13m0 0-5-5m5 5-5 5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
