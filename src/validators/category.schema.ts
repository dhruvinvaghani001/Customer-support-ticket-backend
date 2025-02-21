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
  body: z
    .object({
      name: z
        .string()
        .min(2, "Category name must be at least 2 characters long")
        .optional(),
      parentCategoryId: z
        .union([z.string(), z.number()])
        .nullable()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
          message: "Parent Category ID must be a valid number!",
        })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message:
        "At least one field required to update either name or parentCategoryId",
    }),
};

const deleteCategorySchema = {
  params: updateCategorySchema.params,
};

export { createCategorySchema, updateCategorySchema, deleteCategorySchema };
