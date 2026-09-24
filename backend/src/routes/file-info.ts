import { getFileById } from "../db/files";
import { errorResponse, successResponse } from "../lib/response";

export async function fileInfoRoute(
  request: Request,
  env: Env,
  fileId: string,
): Promise<Response> {
  try {
    const file = await getFileById(env, fileId);

    if (!file) {
      return errorResponse(
        "File not found.",
        404,
        "FILE_NOT_FOUND",
      );
    }

    return successResponse({
      fileId: file._id?.toString(),
      originalName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
      storage: file.storage,
      type: file.type,
      createdAt: file.createdAt,
    });
  } catch (error) {
    console.error(
      "File info failed:",
      error,
    );

    return errorResponse(
      "Unable to retrieve file information.",
      500,
      "FILE_INFO_FAILED",
    );
  }
}