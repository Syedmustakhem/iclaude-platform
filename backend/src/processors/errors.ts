export class ProcessorError extends Error {
  readonly code: string;

  constructor(
    code: string,
    message: string,
  ) {
    super(message);

    this.name = "ProcessorError";
    this.code = code;
  }
}