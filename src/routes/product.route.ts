import express from "express";

import { validateRequest } from "../middlewares/validation.middleware";
import { RoleBasedAuthorise } from "../middlewares/auth.middleware";

import {
  categoryIdSchema,
  createProductShcema,
  deleteProductSchema,
  getProductByIdSchema,
  updateProductSchema,
} from "../validators/product.schema";

import {
  handleCreateProduct,
  handleGetProductById,
  handleGetProducts,
  handleGetProductsByCategory,
  handlUpdateProduct,
  handleDeleteProduct,
} from "../controllers/product.controlller";

const router = express.Router();

// Acess router for get product listing
router.get("/", handleGetProducts);
router.get(
  "/category/:id",
  validateRequest(categoryIdSchema),
  handleGetProductsByCategory
);
router.get("/:id", validateRequest(getProductByIdSchema), handleGetProductById);

// only admin route - [create , update , delete ] products
router.use(RoleBasedAuthorise(["admin"]));
router.post("/", validateRequest(createProductShcema), handleCreateProduct);
router.patch("/:id", validateRequest(updateProductSchema), handlUpdateProduct);
router.delete(
  "/:id",
  validateRequest(deleteProductSchema),
  handleDeleteProduct
);

export { router };
