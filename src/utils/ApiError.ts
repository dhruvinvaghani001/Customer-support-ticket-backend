class ApiError extends Error {
  statusCode: number;
  message: string;
  errors?: Array<string | null>;
  stack?: string;
  success = false;

  constructor(
    statusCode: number,
    message = "Something Went Wrong!",
    errors: any[] = [],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
