import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { createUser, findUserByUsernameOrEmail } from "../models/user.model";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../types/authRequest";

const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // check email or username alredy exist
  const existingUser = await findUserByUsernameOrEmail({ username, email });

  if (existingUser) {
    throw new ApiError(409, "email or username is alredy in use try diffrent!");
  }
  // cretae user
  const user = await createUser({ username, email, password });
  if (!user) {
    throw new ApiError(500, "Internal server Error!");
  }

  res.status(200).json(new ApiResponse(200, user, "user created successfully"));
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExist = await findUserByUsernameOrEmail({ email });

  if (!userExist) {
    throw new ApiError(404, "user does not exist!");
  }

  const passCheck = await bcrypt.compare(password, userExist.password);

  if (!passCheck) {
    throw new ApiError(422, "Provided password is wrong!");
  }
  // generate jwt token and give payload to userid & Role
  const accessToken = await jwt.sign(
    {
      id: userExist.id,
      role: userExist.role,
    },
    process.env.JWT_SECRET!
  );

  res.cookie("accessToken", accessToken);

  res.status(200).json(new ApiResponse(200, { accessToken: accessToken }));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("accessToken", "");
  res.status(200).json(new ApiResponse(200, {}, "Logged out successfully!"));
});

// test profile route function
const profile = asyncHandler(async (req: AuthRequest, res: Response) => {
  res
    .status(200)
    .json(new ApiResponse(200, { user: req.user }, "user profile fetched!"));
});

export { signUp, login, logout, profile };
