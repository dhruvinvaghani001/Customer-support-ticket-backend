import { z } from "zod";

const categoryIdSchema = {
  params: z.object({
    id: z.string(),
  }),
};

const createProductShcema = {
  body: z.object({
    name: z.string({ required_error: "Product name required!" }),
    categoryId: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Category ID must be a valid number!",
      }),
    description: z.string().optional(),
  }),
};

const updateProductSchema = {
  body: z
    .object({
      name: z.string({ required_error: "Product name required!" }).optional(),
      categoryId: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
          message: "Category ID must be a valid number!",
        })
        .optional(),
      description: z.string().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message:
        "At least one field (name,categoryId or description) must be provided to update!",
    }),
  params: z.object({
    id: z.string().uuid(),
  }),
};

const deleteProductSchema = {
  params: updateProductSchema.params,
};

const getProductByIdSchema = {
  params: updateProductSchema.params,
};

export {
  categoryIdSchema,
  createProductShcema,
  updateProductSchema,
  deleteProductSchema,
  getProductByIdSchema,
};
