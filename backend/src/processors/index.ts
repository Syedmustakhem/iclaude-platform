import type { ToolProcessor } from "./types";

import { processImageCompression } from "./image-compressor";
import { processImageResize } from "./image-resizer";

const processors = new Map<string, ToolProcessor>();

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

registerProcessor(
  "image-compressor",
  processImageCompression,
);

registerProcessor(
  "image-resizer",
  processImageResize,
);