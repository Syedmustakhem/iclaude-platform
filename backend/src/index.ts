import { errorResponse } from "./lib/response";

import { healthRoute } from "./routes/health";
import { databaseHealthRoute } from "./routes/database-health";
import { createUploadPresignRoute } from "./routes/uploads";
import { confirmUploadRoute } from "./routes/upload-confirm";
import { createJobRoute } from "./routes/jobs";
import { jobStatusRoute } from "./routes/job-status";
import { downloadFileRoute } from "./routes/download";
import { fileInfoRoute } from "./routes/file-info";
import { processQueueMessage } from "./queue/consumer";

export default {
  async fetch(
    request,
    env,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (
      url.pathname === "/api/health" &&
      request.method === "GET"
    ) {
      return healthRoute();
    }

    if (
      url.pathname === "/api/health/db" &&
      request.method === "GET"
    ) {
      return databaseHealthRoute(env);
    }

    if (
      url.pathname === "/api/uploads/presign" &&
      request.method === "POST"
    ) {
      return createUploadPresignRoute(
        request,
        env,
      );
    }

    if (
      url.pathname === "/api/uploads/confirm" &&
      request.method === "POST"
    ) {
      return confirmUploadRoute(
        request,
        env,
      );
    }

    if (
      url.pathname === "/api/jobs" &&
      request.method === "POST"
    ) {
      return createJobRoute(
        request,
        env,
      );
    }

    if (
      url.pathname.startsWith("/api/files/") &&
      url.pathname.endsWith("/download") &&
      request.method === "GET"
    ) {
      const fileId = url.pathname
        .slice("/api/files/".length)
        .replace(/\/download$/, "");

      if (!fileId) {
        return errorResponse(
          "File ID is required.",
          400,
          "FILE_ID_REQUIRED",
        );
      }

      return downloadFileRoute(
        request,
        env,
        fileId,
      );
    }
if (
  url.pathname.startsWith("/api/files/") &&
  request.method === "GET" &&
  !url.pathname.endsWith("/download")
) {
  const fileId = url.pathname.slice(
    "/api/files/".length,
  );

  if (!fileId) {
    return errorResponse(
      "File ID is required.",
      400,
      "FILE_ID_REQUIRED",
    );
  }

  return fileInfoRoute(
    request,
    env,
    fileId,
  );
}
    if (
      url.pathname.startsWith("/api/jobs/") &&
      request.method === "GET"
    ) {
      const jobId = url.pathname.slice(
        "/api/jobs/".length,
      );

      if (!jobId) {
        return errorResponse(
          "Job ID is required.",
          400,
          "JOB_ID_REQUIRED",
        );
      }

      return jobStatusRoute(
        request,
        env,
        jobId,
      );
    }

    return errorResponse(
      "The requested API endpoint does not exist.",
      404,
      "NOT_FOUND",
    );
  },

  async queue(
    batch,
    env,
  ): Promise<void> {
    for (const message of batch.messages) {
      try {
        await processQueueMessage(
          message,
          env,
        );

        message.ack();
      } catch (error) {
        console.error(
          "Queue message processing failed:",
          error,
        );

        message.retry();
      }
    }
  },
} satisfies ExportedHandler<Env>;