export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// NestJS error bodies look like { statusCode, message, error }; validation
// errors send `message` as a string array.
export async function toApiError(res: Response): Promise<ApiError> {
  let message = `Request failed with status ${res.status}`;
  try {
    const body = (await res.json()) as { message?: unknown };
    if (typeof body.message === 'string') message = body.message;
    if (Array.isArray(body.message)) message = body.message.join(', ');
  } catch {
    // Not JSON (e.g. a proxy's HTML error page): keep the generic message.
  }
  return new ApiError(res.status, message);
}
