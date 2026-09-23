import { ObjectId } from "mongodb";

import { getCollections } from "./collections";
import type { JobDocument } from "./model";

export async function createJob(
  env: Env,
  data: Omit<JobDocument, "_id" | "createdAt" | "status" | "progress">,
): Promise<JobDocument> {
  const collections = await getCollections(env);

  const job: JobDocument = {
    ...data,
    status: "queued",
    progress: 0,
    createdAt: new Date(),
  };

  const result = await collections.jobs.insertOne(job);

  return {
    ...job,
    _id: result.insertedId,
  };
}

export async function getJobById(
  env: Env,
  jobId: string,
): Promise<JobDocument | null> {
  const collections = await getCollections(env);

  if (!ObjectId.isValid(jobId)) {
    return null;
  }

  return collections.jobs.findOne({
    _id: new ObjectId(jobId),
  });
}

export async function updateJobStatus(
  env: Env,
  jobId: string,
  status: JobDocument["status"],
  progress?: number,
): Promise<boolean> {
  const collections = await getCollections(env);

  if (!ObjectId.isValid(jobId)) {
    return false;
  }

  const update: {
    status: JobDocument["status"];
    progress?: number;
    startedAt?: Date;
    completedAt?: Date;
  } = {
    status,
  };

  if (progress !== undefined) {
    update.progress = progress;
  }

  if (status === "processing") {
    update.startedAt = new Date();
  }

  if (status === "completed" || status === "failed") {
    update.completedAt = new Date();
  }

  const result = await collections.jobs.updateOne(
    {
      _id: new ObjectId(jobId),
    },
    {
      $set: update,
    },
  );

  return result.matchedCount > 0;
}