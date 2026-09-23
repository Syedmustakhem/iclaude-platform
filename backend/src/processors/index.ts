import type { ToolProcessor } from "./types";
import { processImageCompression } from "./image-compressor";

const processors = new Map<string, ToolProcessor>();

registerProcessor(
  "image-compressor",
  processImageCompression,
);

export function registerProcessor(
  tool: string,
  processor: ToolProcessor,
): void {
  processors.set(tool, processor);
}

export function getProcessor(
  tool: string,
): ToolProcessor | undefined {
  return processors.get(tool);
}