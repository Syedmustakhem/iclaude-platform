import {
  getJobById,
  setJobOutputFile,
  updateJobStatus,
} from "../db/jobs";

import {
  createFile,
  getFileById,
  getOutputFileByJobId,
} from "../db/files";

import { getProcessor } from "../processors";
import { ProcessorError } from "../processors/errors";

type ProcessingMessage = {
  jobId: string;
  fileId: string;
  tool:
    | "image-compressor"
    | "image-resizer"
    | "remove-background"
    | "pdf-to-word"
    | "video-compressor";
};

function isProcessingMessage(
  value: unknown,
): value is ProcessingMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Record<string, unknown>;

  return (
    typeof message.jobId === "string" &&
    typeof message.fileId === "string" &&
    typeof message.tool === "string"
  );
}

export async function processQueueMessage(
  message: Message<unknown>,
  env: Env,
): Promise<void> {
  if (!isProcessingMessage(message.body)) {
    console.error(
      "Invalid processing queue message:",
      message.body,
    );

    message.ack();

    return;
  }

  const { jobId } = message.body;

  const job = await getJobById(env, jobId);

  if (!job) {
    console.error(
      `Job ${jobId} was not found.`,
    );

    message.ack();

    return;
  }

  if (
    job.status === "completed" ||
    job.status === "failed"
  ) {
    message.ack();

    return;
  }

  if (!job._id) {
    console.error(
      `Job ${jobId} does not have a valid database ID.`,
    );

    message.ack();

    return;
  }

  const existingOutputFile = await getOutputFileByJobId(
    env,
    job._id,
  );

  if (existingOutputFile?._id) {
    console.log(
      `Job ${jobId} already has an output file.`,
    );

    if (!job.outputFileId) {
      const outputLinked = await setJobOutputFile(
        env,
        jobId,
        existingOutputFile._id,
      );

      if (!outputLinked) {
        throw new Error(
          `Unable to link existing output file to job ${jobId}.`,
        );
      }
    }

    await updateJobStatus(
      env,
      jobId,
      "completed",
      100,
    );

    message.ack();

    return;
  }

  const updated = await updateJobStatus(
    env,
    jobId,
    "processing",
    1,
  );

  if (!updated) {
    throw new Error(
      `Unable to update job ${jobId} to processing.`,
    );
  }

  const processor = getProcessor(job.tool);

  if (!processor) {
    const error = {
      code: "PROCESSOR_NOT_FOUND",
      message: `No processor registered for tool: ${job.tool}`,
    };

    await updateJobStatus(
      env,
      jobId,
      "failed",
      0,
      error,
    );

    message.ack();

    return;
  }

  const inputFile = await getFileById(
    env,
    job.inputFileId?.toString() ?? "",
  );

  if (!inputFile) {
    const error = {
      code: "INPUT_FILE_NOT_FOUND",
      message: `Input file for job ${jobId} was not found.`,
    };

    await updateJobStatus(
      env,
      jobId,
      "failed",
      0,
      error,
    );

    message.ack();

    return;
  }

  console.log(
    `Job ${jobId} started processing.`,
  );

  try {
    const result = await processor({
  env,
  job,
  inputFile,
  options: job.options,
});

    console.log(
      `Job ${jobId} completed successfully.`,
      result,
    );

    const outputFile = await createFile(env, {
      sessionId: job.sessionId,
      userId: job.userId,
      jobId: job._id,
      originalName: result.outputName,
      mimeType: result.contentType,
      size: result.size,
      storage: {
        provider: "r2",
        bucket: "iclaude-files",
        key: result.outputKey,
      },
      type: "output",
    });

    if (!outputFile._id) {
      throw new Error(
        `Output file was created without an ID for job ${jobId}.`,
      );
    }

    const outputLinked = await setJobOutputFile(
      env,
      jobId,
      outputFile._id,
    );

    if (!outputLinked) {
      throw new Error(
        `Unable to link output file to job ${jobId}.`,
      );
    }

    await updateJobStatus(
      env,
      jobId,
      "completed",
      100,
    );

    message.ack();
  } catch (error) {
    if (error instanceof ProcessorError) {
      await updateJobStatus(
        env,
        jobId,
        "failed",
        0,
        {
          code: error.code,
          message: error.message,
        },
      );

      console.error(
        `Job ${jobId} failed:`,
        error.code,
        error.message,
      );

      message.ack();

      return;
    }

    console.error(
      `Unexpected processing error for job ${jobId}:`,
      error,
    );

    throw error;
  }
}