import { pool } from "../db";
import { Product } from "../types/types";

export const createProduct = async (
  product: Omit<Product, "id" | "createdAt">
): Promise<Product> => {
  const query = `INSERT INTO products (name,categoryId,description) VALUES ($1,$2,$3);`;
  const values = [product.name, product.categoryId, product.description];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllProducts = async (): Promise<Product[]> => {
  const query = `SELECT * FROM products;`;
  const result = await pool.query(query);
  return result.rows;
};

export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const query = `SELECT * FROM products WHERE categoryId = $1;`;
  const result = await pool.query(query, [categoryId]);
  return result.rows;
};
