import { ObjectId } from "mongodb";

import { getCollections } from "../db/collections";
import { createJob } from "../db/jobs";
import { errorResponse, successResponse } from "../lib/response";

const VALID_TOOLS = [
  "image-compressor",
  "image-resizer",
  "remove-background",
  "pdf-to-word",
  "video-compressor",
] as const;

type ToolName = (typeof VALID_TOOLS)[number];

type ResizeFit =
  | "scale-down"
  | "contain"
  | "cover"
  | "crop"
  | "pad";

type JobOptions = {
  resize?: {
    width?: number;
    height?: number;
    fit?: ResizeFit;
  };
};

function isToolName(
  value: unknown,
): value is ToolName {
  return (
    typeof value === "string" &&
    VALID_TOOLS.includes(
      value as ToolName,
    )
  );
}

function isPositiveInteger(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0
  );
}

function validateJobOptions(
  tool: ToolName,
  value: unknown,
): JobOptions | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw new Error(
      "Job options must be an object.",
    );
  }

  const options = value as Record<string, unknown>;

  if (tool !== "image-resizer") {
    throw new Error(
      `Options are not currently supported for ${tool}.`,
    );
  }

  if (
    options.resize === undefined
  ) {
    throw new Error(
      "Resize options are required for image-resizer.",
    );
  }

  if (
    !options.resize ||
    typeof options.resize !== "object" ||
    Array.isArray(options.resize)
  ) {
    throw new Error(
      "Resize options must be an object.",
    );
  }

  const resize =
    options.resize as Record<string, unknown>;

  const width =
    resize.width;

  const height =
    resize.height;

  const fit =
    resize.fit;

  if (
    width === undefined &&
    height === undefined
  ) {
    throw new Error(
      "At least width or height is required.",
    );
  }

  if (
    width !== undefined &&
    !isPositiveInteger(width)
  ) {
    throw new Error(
      "Width must be a positive integer.",
    );
  }

  if (
    height !== undefined &&
    !isPositiveInteger(height)
  ) {
    throw new Error(
      "Height must be a positive integer.",
    );
  }

  const validFits: ResizeFit[] = [
    "scale-down",
    "contain",
    "cover",
    "crop",
    "pad",
  ];

  if (
    fit !== undefined &&
    (
      typeof fit !== "string" ||
      !validFits.includes(
        fit as ResizeFit,
      )
    )
  ) {
    throw new Error(
      "Invalid resize fit.",
    );
  }

  return {
    resize: {
      ...(width !== undefined
        ? { width }
        : {}),
      ...(height !== undefined
        ? { height }
        : {}),
      ...(fit !== undefined
        ? { fit: fit as ResizeFit }
        : {}),
    },
  };
}

export async function createJobRoute(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const body =
      await request.json<{
        tool?: unknown;
        fileId?: unknown;
        sessionId?: unknown;
        options?: unknown;
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

    let options: JobOptions | undefined;

    try {
      options = validateJobOptions(
        body.tool,
        body.options,
      );
    } catch (error) {
      return errorResponse(
        error instanceof Error
          ? error.message
          : "Invalid job options.",
        400,
        "INVALID_JOB_OPTIONS",
      );
    }

    const collections =
      await getCollections(env);

    const file =
      await collections.files.findOne({
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

    const job = await createJob(
      env,
      {
        sessionId,
        tool: body.tool,
        inputFileId: file._id,
        ...(options ? { options } : {}),
      },
    );

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
        inputFileId:
          job.inputFileId?.toString(),
        createdAt: job.createdAt,
      },
      201,
    );
  } catch (error) {
    console.error(
      "Create job failed:",
      error,
    );

    return errorResponse(
      "Unable to create processing job.",
      500,
      "JOB_CREATION_FAILED",
    );
  }
}