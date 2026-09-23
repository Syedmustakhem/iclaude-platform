import { createPresignedUploadUrl } from "../lib/r2-presigned";
import { errorResponse, successResponse } from "../lib/response";

const VALID_TOOLS = [
  "image-compressor",
  "image-resizer",
  "remove-background",
  "pdf-to-word",
  "video-compressor",
] as const;

type ToolName = (typeof VALID_TOOLS)[number];

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

function isToolName(value: unknown): value is ToolName {
  return (
    typeof value === "string" &&
    VALID_TOOLS.includes(value as ToolName)
  );
}

function isAllowedMimeType(value: unknown): value is string {
  return (
    typeof value === "string" &&
    ALLOWED_MIME_TYPES.has(value)
  );
}

function sanitizeFilename(filename: string): string {
  const cleaned = filename
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, "_");

  return cleaned || "upload";
}

export async function createUploadPresignRoute(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const body = await request.json<{
      filename?: unknown;
      contentType?: unknown;
      size?: unknown;
      tool?: unknown;
      sessionId?: unknown;
    }>();

    if (
      typeof body.filename !== "string" ||
      body.filename.trim().length === 0
    ) {
      return errorResponse(
        "A valid filename is required.",
        400,
        "INVALID_FILENAME",
      );
    }

    if (!isToolName(body.tool)) {
      return errorResponse(
        "A valid tool is required.",
        400,
        "INVALID_TOOL",
      );
    }

    if (!isAllowedMimeType(body.contentType)) {
      return errorResponse(
        "This file type is not supported.",
        400,
        "UNSUPPORTED_FILE_TYPE",
      );
    }

    if (
      typeof body.size !== "number" ||
      !Number.isFinite(body.size) ||
      body.size <= 0
    ) {
      return errorResponse(
        "A valid file size is required.",
        400,
        "INVALID_FILE_SIZE",
      );
    }

    if (body.size > MAX_FILE_SIZE) {
      return errorResponse(
        "The file exceeds the maximum allowed size.",
        413,
        "FILE_TOO_LARGE",
      );
    }

    const sessionId =
      typeof body.sessionId === "string" &&
      body.sessionId.trim().length > 0
        ? body.sessionId.trim()
        : "anonymous";

    const safeFilename = sanitizeFilename(body.filename);

    const objectKey = [
      "inputs",
      sessionId,
      crypto.randomUUID(),
      safeFilename,
    ].join("/");

    const uploadUrl = await createPresignedUploadUrl(
      env,
      objectKey,
      body.contentType,
    );

    return successResponse({
      uploadUrl,
      objectKey,
      expiresIn: 900,
      tool: body.tool,
      filename: safeFilename,
      contentType: body.contentType,
      size: body.size,
    });
  } catch (error) {
    console.error("Create upload presign failed:", error);

    return errorResponse(
      "Unable to create upload URL.",
      500,
      "UPLOAD_PRESIGN_FAILED",
    );
  }
}