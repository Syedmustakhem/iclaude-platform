export async function putObject(
  env: Env,
  key: string,
  body: string | ArrayBuffer | ArrayBufferView | ReadableStream,
  options?: R2HTTPMetadata,
): Promise<void> {
  await env.iclaude_files.put(key, body, {
    httpMetadata: options,
  });
}

export async function getObject(
  env: Env,
  key: string,
): Promise<R2ObjectBody | null> {
  return env.iclaude_files.get(key);
}

export async function deleteObject(
  env: Env,
  key: string,
): Promise<void> {
  await env.iclaude_files.delete(key);
}

export async function objectExists(
  env: Env,
  key: string,
): Promise<boolean> {
  const object = await env.iclaude_files.head(key);

  return object !== null;
}