import type { Collection } from "mongodb";

import { getDatabase } from "../lib/mongodb";
import type {
  FileDocument,
  JobDocument,
  ToolRunDocument,
  UsageDocument,
  UserDocument,
} from "./model";

export type IclaudeCollections = {
  users: Collection<UserDocument>;
  files: Collection<FileDocument>;
  jobs: Collection<JobDocument>;
  toolRuns: Collection<ToolRunDocument>;
  usage: Collection<UsageDocument>;
};

export async function getCollections(
  env: Env,
): Promise<IclaudeCollections> {
  const database = await getDatabase(env);

  return {
    users: database.collection<UserDocument>("users"),
    files: database.collection<FileDocument>("files"),
    jobs: database.collection<JobDocument>("jobs"),
    toolRuns: database.collection<ToolRunDocument>("toolRuns"),
    usage: database.collection<UsageDocument>("usage"),
  };
}