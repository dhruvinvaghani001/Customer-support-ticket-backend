import { pool } from "../db";
import { Product } from "../types/types";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const createProduct = async (
  product: Omit<Product, "id" | "createdAt">
): Promise<Product> => {
  const query = `INSERT INTO products (name,categoryId,description) VALUES ($1,$2,$3) RETURNING id,name,description,categoryid;`;
  const values = [product.name, product.categoryId, product.description];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllProducts = async (): Promise<Product[]> => {
  const query = `SELECT p1.id,p1.name,p1.description,c1.name AS category FROM products p1 LEFT JOIN categories c1 ON p1.categoryid = c1.id;`;
  const result = await pool.query(query);
  return result.rows;
};

const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const query = `SELECT p1.id,p1.name,p1.description,c1.name AS category FROM products p1 LEFT JOIN categories c1 ON p1.categoryid = c1.id WHERE p1.categoryid = $1;`;
  const result = await pool.query(query, [categoryId]);
  return result.rows;
};

const getProductById = async (productId: string): Promise<Product[]> => {
  const query = `SELECT p1.id,p1.name,p1.description,c1.name AS category FROM products p1 LEFT JOIN categories c1 ON p1.categoryid = c1.id WHERE p1.id = $1 LIMIT 1;`;
  const result = await pool.query(query, [productId]);
  if (result.rowCount == 0) {
    throw new ApiError(404, "Product Does not Found!");
  }
  return result.rows[0];
};

const updateProduct = async (
  productId: string,
  updates: Partial<Product>
): Promise<Product | null> => {
  const product = await getProductById(productId);
  // get all fields to update
  const fields = Object.keys(updates);
  // first index is product id in values array to index+2
  const setClause = fields
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");

  // constructu query
  const query = `
    UPDATE products
    SET ${setClause}
    WHERE id = $1
    RETURNING *;
  `;
  console.log(query);

  const values = [
    productId,
    ...fields.map((field) => updates[field as keyof Product]),
  ];

  const result = await pool.query(query, values);

  return result.rowCount! > 0 ? result.rows[0] : null;
};

const deleteProduct = async (productId: string): Promise<boolean> => {
  const product = await getProductById(productId);
  const query = `DELETE FROM products WHERE id=$1`;
  const result = await pool.query(query, [productId]);
  return result.rowCount! > 0 ? true : false;
};

export {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
