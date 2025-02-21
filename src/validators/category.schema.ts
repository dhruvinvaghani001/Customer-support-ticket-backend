import { z } from "zod";

const createCategorySchema = {
  body: z.object({
    name: z.string({ required_error: "category name required!" }),
    parentcategoryId: z.number().optional(),
  }),
};

const updateCategorySchema = {
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(2, "Category name must be at least 2 characters long"),
    parentCategoryId: z.number().optional().nullable(),
  }),
};

const deleteCategorySchema = {
  params: updateCategorySchema.params,
};

export { createCategorySchema, updateCategorySchema, deleteCategorySchema };
