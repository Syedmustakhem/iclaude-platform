export function successResponse<T>(
  data: T,
  status = 200,
): Response {
  return Response.json(
    {
      success: true,
      data,
    },
    { status },
  );
}

export function errorResponse(
  message: string,
  status = 400,
  code?: string,
): Response {
  return Response.json(
    {
      success: false,
      error: {
        message,
        ...(code ? { code } : {}),
      },
    },
    { status },
  );
}