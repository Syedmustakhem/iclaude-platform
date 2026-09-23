import type {
  ProcessorContext,
  ProcessorResult,
} from "./types";

export async function processImageCompression(
  context: ProcessorContext,
): Promise<ProcessorResult> {
  const { job, inputFile } = context;

  console.log(
    `Image compression requested for job ${job._id?.toString()}`,
  );

  console.log(
    `Input object: ${inputFile.storage.key}`,
  );

  throw new Error(
    "IMAGE_COMPRESSION_PROCESSOR_NOT_IMPLEMENTED",
  );
}