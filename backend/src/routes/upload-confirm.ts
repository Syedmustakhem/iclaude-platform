import { getFileByStorageKey, createFile } from "../db/files";
import { objectExists } from "../lib/r2";
import { errorResponse, successResponse } from "../lib/response";

const VALID_TOOLS = [
  "image-compressor",
  "image-resizer",
  "remove-background",
  "pdf-to-word",
  "video-compressor",
] as const;

type ToolName = (typeof VALID_TOOLS)[number];

function isToolName(value: unknown): value is ToolName {
  return (
    typeof value === "string" &&
    VALID_TOOLS.includes(value as ToolName)
  );
}

export async function confirmUploadRoute(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const body = await request.json<{
      objectKey?: unknown;
      filename?: unknown;
      contentType?: unknown;
      size?: unknown;
      tool?: unknown;
      sessionId?: unknown;
    }>();

    if (
      typeof body.objectKey !== "string" ||
      body.objectKey.trim().length === 0
    ) {
      return errorResponse(
        "A valid object key is required.",
        400,
        "INVALID_OBJECT_KEY",
      );
    }

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

    if (
      typeof body.contentType !== "string" ||
      body.contentType.trim().length === 0
    ) {
      return errorResponse(
        "A valid content type is required.",
        400,
        "INVALID_CONTENT_TYPE",
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

    if (!isToolName(body.tool)) {
      return errorResponse(
        "A valid tool is required.",
        400,
        "INVALID_TOOL",
      );
    }

    const objectKey = body.objectKey.trim();

    const existingFile = await getFileByStorageKey(
      env,
      objectKey,
    );

    if (existingFile?._id) {
      return successResponse({
        fileId: existingFile._id.toString(),
        status: "already_confirmed",
        objectKey,
        filename: existingFile.originalName,
        contentType: existingFile.mimeType,
        size: existingFile.size,
      });
    }

    const exists = await objectExists(env, objectKey);

    if (!exists) {
      return errorResponse(
        "Uploaded file was not found in storage.",
        404,
        "FILE_NOT_FOUND_IN_STORAGE",
      );
    }

    const sessionId =
      typeof body.sessionId === "string" &&
      body.sessionId.trim().length > 0
        ? body.sessionId.trim()
        : "anonymous";

    const file = await createFile(env, {
      sessionId,
      originalName: body.filename.trim(),
      mimeType: body.contentType.trim(),
      size: body.size,
      storage: {
        provider: "r2",
        bucket: "iclaude-files",
        key: objectKey,
      },
      type: "input",
    });

    return successResponse(
      {
        fileId: file._id?.toString(),
        status: "confirmed",
        tool: body.tool,
        objectKey,
        filename: file.originalName,
        contentType: file.mimeType,
        size: file.size,
        createdAt: file.createdAt,
      },
      201,
    );
  } catch (error) {
    console.error("Confirm upload failed:", error);

    return errorResponse(
      "Unable to confirm uploaded file.",
      500,
      "UPLOAD_CONFIRMATION_FAILED",
    );
  }
}