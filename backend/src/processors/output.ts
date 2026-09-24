import { putObject } from "../lib/r2";
import type { ProcessorResult } from "./types";

export async function writeProcessorOutput(
  env: Env,
  result: ProcessorResult,
  body: ArrayBuffer | ArrayBufferView | ReadableStream | Blob,
): Promise<ProcessorResult> {
  await putObject(
    env,
    result.outputKey,
    body,
    {
      contentType: result.contentType,
      contentDisposition: `attachment; filename="${result.outputName}"`,
    },
  );

  return result;
}