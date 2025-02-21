import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getSubCategories,
  updateCategory,
} from "../models/category.model";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { Category } from "../types/types";

const handleGetcategories = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const result = await getCategories();
    res.status(200).json(new ApiResponse(200, result, "Get All categories!"));
  }
);
const handleGetSubCategories = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const result = await getSubCategories(Number(id));
    res
      .status(200)
      .json(new ApiResponse(200, result, "Get All sub categories!"));
  }
);
const handleCreateCategory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name, parentcategoryId } = req.body;

    const result = await createCategory({
      name,
      parentCategoryId: parentcategoryId,
    });
    console.log(result);
    if (!result) {
      throw new ApiError(500, "Internal server Error!");
    }
    res
      .status(200)
      .json(new ApiResponse(200, result, "category created successfully!"));
  }
);

const handleUpdateCategory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name, parentCategoryId } = req.body;
    const { id } = req.params;
    console.log(name, parentCategoryId);
    const updates: Partial<Category> = {};
    if (name) updates.name = name;
    if (parentCategoryId != "undefined") {
      updates.parentCategoryId = parentCategoryId;
    }
    const result = await updateCategory(Number(id), updates);
    if (!result) {
      throw new ApiError(500, "Internal server Error!");
    }
    res
      .status(200)
      .json(new ApiResponse(200, result, "category updated successfully!"));
  }
);

const handleDeleteCategory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const result = await deleteCategory(Number(id));
    if (!result) {
      throw new ApiError(500, "Internal server Error!");
    }
    res
      .status(200)
      .json(new ApiResponse(200, result, "category deleted successfully!"));
  }
);

export {
  handleCreateCategory,
  handleGetcategories,
  handleGetSubCategories,
  handleDeleteCategory,
  handleUpdateCategory,
};
