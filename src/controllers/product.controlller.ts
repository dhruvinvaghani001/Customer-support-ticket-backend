import { Request, Response } from "express";

import { AuthRequest } from "../types/authRequest";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from "../models/product.model";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Product } from "../types/types";

const handleCreateProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name, categoryId, description } = req.body;
    const result = await createProduct({ name, categoryId, description });
    console.log(result);
    if (!result) {
      throw new ApiError(500, "Internal Server Error!");
    }
    res
      .status(200)
      .json(new ApiResponse(200, result, "Create Product Successfully!"));
  }
);

const handleGetProducts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const result = await getAllProducts();
    if (!result) {
      throw new ApiError(500, "Internal Server Error!");
    }
    res
      .status(200)
      .json(new ApiResponse(200, result, "Create Product Successfully!"));
  }
);

const handleGetProductsByCategory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const result = await getProductsByCategory(id);
    if (!result) {
      throw new ApiError(500, "Internal Server Error!");
    }
    res
      .status(200)
      .json(new ApiResponse(200, result, "Create Product Successfully!"));
  }
);

const handleGetProductById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const result = await getProductById(id);
    if (!result) {
      throw new ApiError(500, "Internal Server Error!");
    }
    res
      .status(200)
      .json(new ApiResponse(200, result, "Create Product Successfully!"));
  }
);

const handlUpdateProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, categoryId, description } = req.body;
    const updates: Partial<Product> = {};
    if (name) updates.name = name;
    if (categoryId) updates.categoryId = categoryId;
    if (description) updates.description = description;
    const result = await updateProduct(id, updates);
    res
      .status(200)
      .json(new ApiResponse(200, result, "Product updated Successsfully!"));
  }
);

const handleDeleteProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const result = await deleteProduct(id);
    res
      .status(200)
      .json(new ApiResponse(200, {}, "Product Deleted Successfully!"));
  }
);

export {
  handleCreateProduct,
  handleGetProducts,
  handleGetProductsByCategory,
  handlUpdateProduct,
  handleGetProductById,
  handleDeleteProduct,
};
