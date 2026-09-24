import { getFileById } from "../db/files";
import { errorResponse, successResponse } from "../lib/response";
import { createPresignedDownloadUrl } from "../lib/r2-presigned";

export async function downloadFileRoute(
  request: Request,
  env: Env,
  fileId: string,
): Promise<Response> {
  try {
    const file = await getFileById(env, fileId);

    if (!file) {
      return errorResponse(
        "The requested file was not found.",
        404,
        "FILE_NOT_FOUND",
      );
    }

    if (file.type !== "output") {
      return errorResponse(
        "Only output files can be downloaded.",
        400,
        "INVALID_FILE_TYPE",
      );
    }

    const downloadUrl =
      await createPresignedDownloadUrl(
        env,
        file.storage.key,
      );

    return successResponse({
      fileId: file._id?.toString(),
      fileName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
      downloadUrl,
      expiresIn: 900,
    });
  } catch (error) {
    console.error(
      "Create download URL failed:",
      error,
    );

    return errorResponse(
      "Unable to create the download URL.",
      500,
      "DOWNLOAD_URL_CREATION_FAILED",
    );
  }
}