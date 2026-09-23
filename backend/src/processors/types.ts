import type { FileDocument, JobDocument } from "../db/model";

export type ProcessorContext = {
  env: Env;
  job: JobDocument;
  inputFile: FileDocument;
};

export type ProcessorResult = {
  outputKey: string;
  outputName: string;
  contentType: string;
  size: number;
};

export type ToolProcessor = (
  context: ProcessorContext,
) => Promise<ProcessorResult>;