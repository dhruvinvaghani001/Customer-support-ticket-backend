import express from "express";
import {
  handleGetcategories,
  handleCreateCategory,
  handleDeleteCategory,
  handleUpdateCategory,
  handleGetSubCategories,
} from "../controllers/category.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../validators/category.schema";
import { RoleBasedAuthorise } from "../middlewares/auth.middleware";

const router = express.Router();

// access for all
router.get("/", handleGetcategories);
router.get(
  "/:id",
  validateRequest(deleteCategorySchema),
  handleGetSubCategories
);

router.use(RoleBasedAuthorise(["admin"]));

// only admin route - [create , update , delete ] categories
router.post("/", validateRequest(createCategorySchema), handleCreateCategory);

router.patch(
  "/:id",
  validateRequest(updateCategorySchema),
  handleUpdateCategory
);
router.delete(
  "/:id",
  validateRequest(deleteCategorySchema),
  handleDeleteCategory
);

export { router };
