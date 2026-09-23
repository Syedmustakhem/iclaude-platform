import { ObjectId } from "mongodb";

import { getCollections } from "../db/collections";
import { createJob } from "../db/jobs";
import {
  errorResponse,
  successResponse,
} from "../lib/response";

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

export async function createJobRoute(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const body = await request.json<{
      tool?: unknown;
      fileId?: unknown;
      sessionId?: unknown;
    }>();

    if (!isToolName(body.tool)) {
      return errorResponse(
        "A valid tool is required.",
        400,
        "INVALID_TOOL",
      );
    }

    if (
      typeof body.fileId !== "string" ||
      !ObjectId.isValid(body.fileId)
    ) {
      return errorResponse(
        "A valid file ID is required.",
        400,
        "INVALID_FILE_ID",
      );
    }

    const collections = await getCollections(env);

    const file = await collections.files.findOne({
      _id: new ObjectId(body.fileId),
    });

    if (!file) {
      return errorResponse(
        "The uploaded file could not be found.",
        404,
        "FILE_NOT_FOUND",
      );
    }

    if (file.type !== "input") {
      return errorResponse(
        "Only input files can be processed.",
        400,
        "INVALID_INPUT_FILE",
      );
    }

    const sessionId =
      typeof body.sessionId === "string" &&
      body.sessionId.trim().length > 0
        ? body.sessionId.trim()
        : file.sessionId;

    const job = await createJob(env, {
      sessionId,
      tool: body.tool,
      inputFileId: file._id,
    });

    await env.iclaude_processing.send({
  jobId: job._id?.toString(),
  fileId: file._id?.toString(),
  tool: job.tool,
});

    return successResponse(
      {
        jobId: job._id?.toString(),
        tool: job.tool,
        status: job.status,
        progress: job.progress,
        inputFileId: job.inputFileId?.toString(),
        createdAt: job.createdAt,
      },
      201,
    );
  } catch (error) {
    console.error("Create job failed:", error);

    return errorResponse(
      "Unable to create processing job.",
      500,
      "JOB_CREATION_FAILED",
    );
  }
}