import { ObjectId } from "mongodb";

import { getCollections } from "./collections";
import type { FileDocument } from "./model";

export async function createFile(
  env: Env,
  data: Omit<FileDocument, "_id" | "createdAt">,
): Promise<FileDocument> {
  const collections = await getCollections(env);

  const file: FileDocument = {
    ...data,
    createdAt: new Date(),
  };

  const result = await collections.files.insertOne(file);

  return {
    ...file,
    _id: result.insertedId,
  };
}

export async function getFileById(
  env: Env,
  fileId: string,
): Promise<FileDocument | null> {
  const collections = await getCollections(env);

  if (!ObjectId.isValid(fileId)) {
    return null;
  }

  return collections.files.findOne({
    _id: new ObjectId(fileId),
  });
}

export async function getFileByStorageKey(
  env: Env,
  key: string,
): Promise<FileDocument | null> {
  const collections = await getCollections(env);

  return collections.files.findOne({
    "storage.key": key,
  });
}

export async function getOutputFileByJobId(
  env: Env,
  jobId: ObjectId,
): Promise<FileDocument | null> {
  const collections = await getCollections(env);

  return collections.files.findOne({
    jobId,
    type: "output",
  });
}

export async function updateFile(
  env: Env,
  fileId: string,
  updates: Partial<Omit<FileDocument, "_id">>,
): Promise<boolean> {
  const collections = await getCollections(env);

  if (!ObjectId.isValid(fileId)) {
    return false;
  }

  const result = await collections.files.updateOne(
    {
      _id: new ObjectId(fileId),
    },
    {
      $set: updates,
    },
  );

  return result.matchedCount > 0;
}

export async function deleteFileRecord(
  env: Env,
  fileId: string,
): Promise<boolean> {
  const collections = await getCollections(env);

  if (!ObjectId.isValid(fileId)) {
    return false;
  }

  const result = await collections.files.deleteOne({
    _id: new ObjectId(fileId),
  });

  return result.deletedCount > 0;
}