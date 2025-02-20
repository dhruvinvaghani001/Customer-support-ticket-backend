import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types/authRequest";
import { ApiResponse } from "../utils/ApiResponse";

const authorize = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorised user!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };
    if (!decoded) {
      throw new ApiError(403, "Token expires!");
    }
    req.user = decoded;
    next();
  }
);

const RoleBasedAuthorise = (allowRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorised user!");
    }
    const { role } = req.user;
    if (!allowRoles.includes(role)) {
      throw new ApiError(403, "you are not authorised to do!");
    }
    next();
  };
};

export { authorize, RoleBasedAuthorise };
