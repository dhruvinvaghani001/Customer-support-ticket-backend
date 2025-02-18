import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError";
import logger from "../log/logger";

const globalErrorHandler: ErrorRequestHandler = (
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(error.message, {
    stack: process.env.NODE_ENV === "production" && error?.stack,
    method: req.method,
    path: req.originalUrl,
    statusCode: error instanceof ApiError ? error.statusCode : 500,
  });

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      errors: error.errors,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    errors: [error.message],
  });
  return;
};

export { globalErrorHandler };
