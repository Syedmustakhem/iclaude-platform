type ImageTransformOptions = {
  width?: number;
  height?: number;
  fit?:
    | "scale-down"
    | "contain"
    | "cover"
    | "crop"
    | "pad";
};

export async function transformImage(
  env: Env,
  input: ArrayBuffer,
  options: ImageTransformOptions,
): Promise<ArrayBuffer> {
  if (input.byteLength === 0) {
    throw new Error("Input image buffer is empty.");
  }

  const inputStream = new Blob([input]).stream();

  const image = env.IMAGES.input(inputStream);

  const transformed = image.transform({
    ...(options.width !== undefined
      ? { width: options.width }
      : {}),
    ...(options.height !== undefined
      ? { height: options.height }
      : {}),
    ...(options.fit !== undefined
      ? { fit: options.fit }
      : {}),
  });

  const output = await transformed.output({
    format: "image/webp",
    quality: 80,
  });

  const response = output.response();

  if (!response.ok) {
    throw new Error(
      `Cloudflare Images transformation failed with status ${response.status}.`,
    );
  }

  const outputBuffer = await response.arrayBuffer();

  if (outputBuffer.byteLength === 0) {
    throw new Error(
      "Cloudflare Images returned an empty output.",
    );
  }

  return outputBuffer;
}