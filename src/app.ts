import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { ApiError } from "./utils/ApiError";

import { router as authRouter } from "./routes/auth.routes";
import { router as userRouter } from "./routes/usermanagement.route";

dotenv.config();

// rate limiter used to prevent api missuse
const rateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOWMS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || "";
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options?.max
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

const app = express();

app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// cors setup
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*"
        : process.env.CORS_ORIGINS?.split(","),
    credentials: process.env.CORS_ORIGIN === "*" ? false : true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// authentication module routes
app.use("/api/v1/auth", authRouter);

app.use(authRouter);

// user-management module
app.use("/api/v1/user", userRouter);

app.use(globalErrorHandler);

export { app };
