import { successResponse } from "../lib/response";

export function healthRoute(): Response {
  return successResponse({
    status: "ok",
    service: "iclaude-api",
    timestamp: new Date().toISOString(),
  });
}