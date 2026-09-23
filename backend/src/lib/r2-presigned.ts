import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_BUCKET_NAME = "iclaude-files";

function getR2Client(env: Env): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: env.R2_ENDPOINT,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });
}

export async function createPresignedUploadUrl(
  env: Env,
  key: string,
  contentType: string,
  expiresIn = 900,
): Promise<string> {
  const client = getR2Client(env);

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(client, command, {
    expiresIn,
  });
}