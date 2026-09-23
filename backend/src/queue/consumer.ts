import {
  getJobById,
  updateJobStatus,
} from "../db/jobs";
import { getFileById } from "../db/files";
import { getProcessor } from "../processors";

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
    await updateJobStatus(
      env,
      jobId,
      "failed",
      0,
    );

    throw new Error(
      `No processor registered for tool: ${job.tool}`,
    );
  }

  const inputFile = await getFileById(
    env,
    job.inputFileId?.toString() ?? "",
  );

  if (!inputFile) {
    await updateJobStatus(
      env,
      jobId,
      "failed",
      0,
    );

    throw new Error(
      `Input file for job ${jobId} was not found.`,
    );
  }

  console.log(
    `Job ${jobId} started processing.`,
  );

  await processor({
    env,
    job,
    inputFile,
  });
}