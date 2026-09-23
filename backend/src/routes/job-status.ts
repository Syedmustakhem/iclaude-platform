import { getJobById } from "../db/jobs";
import { errorResponse, successResponse } from "../lib/response";

export async function jobStatusRoute(
  request: Request,
  env: Env,
  jobId: string,
): Promise<Response> {
  try {
    const job = await getJobById(env, jobId);

    if (!job) {
      return errorResponse(
        "Job not found.",
        404,
        "JOB_NOT_FOUND",
      );
    }

    return successResponse({
      jobId: job._id?.toString(),
      tool: job.tool,
      status: job.status,
      progress: job.progress,
      inputFileId: job.inputFileId?.toString(),
      outputFileId: job.outputFileId?.toString(),
      error: job.error,
      createdAt: job.createdAt,
      startedAt: job.startedAt,
      completedAt: job.completedAt,
    });
  } catch (error) {
    console.error("Get job status failed:", error);

    return errorResponse(
      "Unable to retrieve job status.",
      500,
      "JOB_STATUS_FAILED",
    );
  }
}