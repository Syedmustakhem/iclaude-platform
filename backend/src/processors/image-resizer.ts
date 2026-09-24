
import type {
  ProcessorContext,
  ProcessorResult,
} from "./types";

import { ProcessorError } from "./errors";
import { getObject } from "../lib/r2";
import { transformImage } from "./image-transform";
import { writeProcessorOutput } from "./output";

function getOutputKey(jobId: string): string {
  return `outputs/${jobId}/resized.webp`;
}

export async function processImageResize(
  context: ProcessorContext,
): Promise<ProcessorResult> {
  const {
    env,
    job,
    inputFile,
    options,
  } = context;

  const jobId = job._id?.toString();

  if (!jobId) {
    throw new ProcessorError(
      "INVALID_JOB_ID",
      "The processing job does not have a valid ID.",
    );
  }

  const resize = options?.resize;

  if (!resize) {
    throw new ProcessorError(
      "RESIZE_OPTIONS_REQUIRED",
      "Resize options are required.",
    );
  }

  if (
    resize.width === undefined &&
    resize.height === undefined
  ) {
    throw new ProcessorError(
      "RESIZE_DIMENSIONS_REQUIRED",
      "At least width or height is required.",
    );
  }

  console.log(
    `Image resize started for job ${jobId}.`,
  );

  console.log(
    `Input object: ${inputFile.storage.key}`,
  );

  const inputObject = await getObject(
    env,
    inputFile.storage.key,
  );

  if (!inputObject) {
    throw new ProcessorError(
      "INPUT_OBJECT_NOT_FOUND",
      "The uploaded image could not be found in storage.",
    );
  }

  const inputBytes = await inputObject.arrayBuffer();

  if (inputBytes.byteLength === 0) {
    throw new ProcessorError(
      "EMPTY_INPUT_FILE",
      "The uploaded image is empty.",
    );
  }

  if (inputBytes.byteLength > 20 * 1024 * 1024) {
    throw new ProcessorError(
      "IMAGE_TOO_LARGE_FOR_PROCESSING",
      "The image exceeds the 20 MB processing limit.",
    );
  }

  let outputBytes: ArrayBuffer;

  try {
    outputBytes = await transformImage(
      env,
      inputBytes,
      {
        width: resize.width,
        height: resize.height,
        fit: resize.fit,
      },
    );
   } catch (error) {
    console.error(
      `Image resize failed for job ${jobId}:`,
      error,
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);

    throw new ProcessorError(
      "IMAGE_RESIZE_FAILED",
      `The image could not be resized: ${errorMessage}`,
    );
  }

  const outputKey = getOutputKey(jobId);

  const result: ProcessorResult = {
    outputKey,
    outputName: "resized.webp",
    contentType: "image/webp",
    size: outputBytes.byteLength,
  };

  await writeProcessorOutput(
    env,
    result,
    outputBytes,
  );

  console.log(
    `Image resize completed for job ${jobId}.`,
  );

  return result;
}