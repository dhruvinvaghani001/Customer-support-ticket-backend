import { Response } from "express";

import { AuthRequest } from "../types/authRequest";
import { ApiResponse } from "../utils/ApiResponse";

import { asyncHandler } from "../utils/asyncHandler";
import { deleteUserDB, updateUserRole } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

const editUserRole = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await updateUserRole(id, role);

  res.status(200).json(new ApiResponse(200, result, "Changed user role"));
});

const deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const result = await deleteUserDB(id);

  if (!result) {
    throw new ApiError(500, "internal server error!");
  }

  res.status(200).json(new ApiResponse(200, {}, "Delete use successfully!"));
});

export { editUserRole, deleteUser };
