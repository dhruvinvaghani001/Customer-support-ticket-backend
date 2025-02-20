import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

import { ApiError } from "../utils/ApiError";

const validateRequest =
  (schema: {
    body?: ZodSchema<any>;
    query?: ZodSchema<any>;
    params?: ZodSchema<any>;
  }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        schema.body.parse(req.body);
      }
      if (schema.query) {
        schema.query.parse(req.query);
      }
      if (schema.params) {
        schema.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((er) => ({
          path: er.path.join(","),
          msg: er.message,
        }));
        throw new ApiError(422, "Validation Errors!", errors);
      }
      throw new ApiError(422, "Internal server Error!");
    }
  };

export { validateRequest };
