import type { ObjectId } from "mongodb";

export type UserDocument = {
  _id?: ObjectId;

  email?: string;
  name?: string;

  // Will be used when authentication is added.
  authProvider?: "email" | "google" | "github";

  createdAt: Date;
  updatedAt: Date;
};

export type FileDocument = {
  _id?: ObjectId;

  // Anonymous users can have a temporary session ID.
  sessionId?: string;

  userId?: ObjectId;

  jobId?: ObjectId;

  originalName: string;
  mimeType: string;
  size: number;

  storage: {
    provider: "r2";
    bucket: string;
    key: string;
  };

  type: "input" | "output";

  createdAt: Date;
  expiresAt?: Date;
};

export type JobDocument = {
  _id?: ObjectId;

  // Anonymous processing support.
  sessionId?: string;

  userId?: ObjectId;

  tool:
    | "image-compressor"
    | "image-resizer"
    | "remove-background"
    | "pdf-to-word"
    | "video-compressor";

  status:
    | "queued"
    | "processing"
    | "completed"
    | "failed";

  inputFileId?: ObjectId;
  outputFileId?: ObjectId;

  progress: number;

  error?: {
    code: string;
    message: string;
  };

  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
};

export type ToolRunDocument = {
  _id?: ObjectId;

  sessionId?: string;
  userId?: ObjectId;

  jobId: ObjectId;

  tool:
    | "image-compressor"
    | "image-resizer"
    | "remove-background"
    | "pdf-to-word"
    | "video-compressor";

  status:
    | "started"
    | "completed"
    | "failed";

  durationMs?: number;

  createdAt: Date;
};

export type UsageDocument = {
  _id?: ObjectId;

  sessionId?: string;
  userId?: ObjectId;

  date: string;

  toolRuns: number;
  totalBytesProcessed: number;

  createdAt: Date;
  updatedAt: Date;
};