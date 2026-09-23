import { getDatabase } from "../lib/mongodb";
import { errorResponse, successResponse } from "../lib/response";

export async function databaseHealthRoute(
  env: Env,
): Promise<Response> {
  try {
    const database = await getDatabase(env);

    await database.command({ ping: 1 });

    return successResponse({
      status: "ok",
      service: "mongodb",
      database: "iclaude",
    });
  } catch (error) {
    console.error("MongoDB health check failed:", error);

    return errorResponse(
      "Database connection failed.",
      503,
      "DATABASE_UNAVAILABLE",
    );
  }
}