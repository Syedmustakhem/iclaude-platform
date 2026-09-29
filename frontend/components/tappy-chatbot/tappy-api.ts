// Tappy's backend client — talks to the same iclaude job API the tool
// pages use: presign → upload → confirm → create job → poll → download.

export type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: { code?: string; message?: string };
};

type PresignData = {
  uploadUrl: string;
  objectKey: string;
};

type ConfirmData = {
  fileId: string;
};

type JobData = {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  outputFileId?: string;
  error?: { code: string; message: string };
};

const RAW_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8787/api";

/** Normalise the API base: strip trailing slashes and a trailing /api. */
export function getApiBase(): string {
  return RAW_BASE.replace(/\/+$/, "").replace(/\/api$/, "");
}

const SESSION_KEY = "iclaude_session_id";

export function getSessionId(): string {
  if (typeof window === "undefined") return "anonymous";
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(SESSION_KEY, id);
  return id;
}

async function parse<T>(res: Response): Promise<T> {
  let body: ApiEnvelope<T>;
  try {
    body = await res.json();
  } catch {
    throw new Error(
      `The server returned an invalid response (${res.status}).`,
    );
  }
  if (!res.ok || !body.success || body.data === undefined) {
    throw new Error(
      body.error?.message ||
        `Request failed with status ${res.status}.`,
    );
  }
  return body.data;
}

async function uploadOne(
  file: File,
  tool: string,
  sessionId: string,
  onProgress: (pct: number) => void,
): Promise<string> {
  const base = getApiBase();

  const presign = await parse<PresignData>(
    await fetch(`${base}/uploads/presign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
        size: file.size,
        tool,
        sessionId,
      }),
    }),
  );

  const up = await fetch(presign.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!up.ok) {
    throw new Error(`Upload failed (${up.status}).`);
  }

  const confirmed = await parse<ConfirmData>(
    await fetch(`${base}/uploads/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        objectKey: presign.objectKey,
        filename: file.name,
        contentType: file.type,
        size: file.size,
        tool,
        sessionId,
      }),
    }),
  );

  onProgress(40);
  return confirmed.fileId;
}

async function pollJob(
  jobId: string,
  onProgress: (pct: number) => void,
): Promise<JobData> {
  const base = getApiBase();
  const maxAttempts = 120;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((r) =>
      setTimeout(r, attempt === 0 ? 500 : 1000),
    );

    const job = await parse<JobData>(
      await fetch(`${base}/jobs/${encodeURIComponent(jobId)}`, {
        method: "GET",
        cache: "no-store",
      }),
    );

    if (job.status === "failed") {
      throw new Error(
        job.error?.message || "Processing failed.",
      );
    }

    if (job.status === "completed") {
      onProgress(100);
      return job;
    }

    onProgress(
      Math.min(95, 45 + Math.round((job.progress ?? 0) * 0.5)),
    );
  }

  throw new Error(
    "It's taking longer than expected. Please try again.",
  );
}

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

export function extensionFor(mime: string): string {
  return EXT_BY_MIME[mime] || "bin";
}

export function outputName(
  originalName: string,
  tool: string,
  mime: string,
): string {
  const base = originalName.replace(/\.[^/.]+$/, "") || "tappy-result";
  return `${base}-${tool}.${extensionFor(mime)}`;
}

export type TappyJobResult = {
  blob: Blob;
  filename: string;
  mime: string;
};

/**
 * Run a backend tool inside the chat: upload file(s) → create job →
 * poll → download. Works for single-file and multi-file (merge) tools.
 */
export async function runJobTool(
  tool: string,
  files: File[],
  options: Record<string, unknown> | undefined,
  onProgress: (pct: number, label: string) => void,
): Promise<TappyJobResult> {
  const base = getApiBase();
  const sessionId = getSessionId();

  onProgress(5, "Uploading your file…");
  const fileIds: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const id = await uploadOne(files[i], tool, sessionId, (p) =>
      onProgress(
        Math.min(40, Math.round(((i + p / 100) / files.length) * 40)),
        "Uploading your file…",
      ),
    );
    fileIds.push(id);
  }

  onProgress(45, "Starting the job…");
  const body: Record<string, unknown> = {
    tool,
    sessionId,
  };
  if (fileIds.length > 1) body.fileIds = fileIds;
  else body.fileId = fileIds[0];
  if (options) body.options = options;

  const created = await parse<{ jobId: string }>(
    await fetch(`${base}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );

  onProgress(50, "Working on it…");
  const done = await pollJob(created.jobId, (p) =>
    onProgress(p, "Working on it…"),
  );

  if (!done.outputFileId) {
    throw new Error("Finished, but no file came back.");
  }

  onProgress(98, "Fetching your file…");
  const dl = await fetch(
    `${base}/files/${encodeURIComponent(done.outputFileId)}/download`,
  );
  if (!dl.ok) {
    throw new Error(`Couldn't fetch the result (${dl.status}).`);
  }
  const blob = await dl.blob();
  if (blob.size === 0) {
    throw new Error("The server returned an empty file.");
  }

  const firstName = files[0]?.name || "file";
  return {
    blob,
    mime: blob.type || "application/octet-stream",
    filename: outputName(firstName, tool, blob.type),
  };
}
