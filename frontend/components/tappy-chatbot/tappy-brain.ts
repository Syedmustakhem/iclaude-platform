// Tappy's tiny "brain" — no AI service needed. It matches what the
// visitor types against tool keywords, and guides confused visitors
// with simple questions.

import { TOOLS, type TappyTool } from "./tappy-tools";

export type Match = { tool: TappyTool; score: number };

/** Rank tools by keyword hits in the visitor's message. */
export function findToolsFor(text: string): TappyTool[] {
  const q = text.toLowerCase().trim();
  if (!q) return [];

  const scored: Match[] = [];
  for (const tool of TOOLS) {
    let score = 0;
    // tool name itself is a strong signal
    if (q.includes(tool.name.toLowerCase())) score += 5;
    if (q.includes(tool.slug.replace(/-/g, " "))) score += 4;
    for (const kw of tool.keywords) {
      if (kw && q.includes(kw.toLowerCase())) {
        score += kw.length > 5 ? 3 : 1;
      }
    }
    if (score > 0) scored.push({ tool, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.tool);
}

export type HelperChip = { label: string; reply: string };

/** Quick-reply chips shown when the visitor seems confused. */
export const CONFUSED_CHIPS: HelperChip[] = [
  { label: "🖼️ Image", reply: "I want to do something with an image" },
  { label: "📄 PDF", reply: "I want to do something with a PDF" },
  { label: "🎬 Video", reply: "I want to do something with a video" },
  { label: "🔳 QR code", reply: "I want a QR code" },
  { label: "✨ AI image", reply: "I want to generate an AI image" },
];

const CATEGORY_HINTS: { match: RegExp; ask: string }[] = [
  {
    match: /image|photo|picture|pic\b|jpg|png|webp|heic/,
    ask: "Got it — images! What do you want to do with it?",
  },
  {
    match: /pdf|document/,
    ask: "PDFs, understood. What do you need — merge, convert, or make one?",
  },
  {
    match: /video|mp4/,
    ask: "Videos! Want to compress one, or trim and convert it?",
  },
  {
    match: /qr/,
    ask: "A QR code it is — what should it contain?",
  },
];

export function confusedGuidance(text: string): string {
  const q = text.toLowerCase();
  for (const hint of CATEGORY_HINTS) {
    if (hint.match.test(q)) return hint.ask;
  }
  return "No worries, I'll help you find it. What kind of file are you working with?";
}

const SMALLTALK: { match: RegExp; reply: string }[] = [
  {
    match: /^(hi|hii+|hello|hey|namaste|yo)\b/,
    reply:
      "Hey there! 👋 I'm Tappy. Pick a tool below, or just tell me what you want to do with your file.",
  },
  {
    match: /thank|shukriya|dhanyavad/,
    reply: "Anytime! 😊 Need anything else with your files?",
  },
  {
    match: /who are you|your name/,
    reply: "I'm Tappy — iclaude's little helper. I can run all the site's tools right here in the chat!",
  },
  {
    match: /bye|alvida/,
    reply: "Bye! I'll be right here whenever your files need me. 👋",
  },
];

/** Friendly replies for greetings etc. Returns null when it's a task. */
export function smallTalk(text: string): string | null {
  const q = text.toLowerCase().trim();
  for (const s of SMALLTALK) {
    if (s.match.test(q)) return s.reply;
  }
  return null;
}
