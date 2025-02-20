import { pool } from "../db";
import { Category } from "../types/types";

export const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const query = `INSERT INTO categories (name,parentCategoryId) VALUES ($1,$2)`;

  const values = [category.name, category?.parentCategoryId];
  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getCategories = async (): Promise<Category[]> => {
  const query = `SELECT * FROM categories;`;
  const result = await pool.query(query);
  return result.rows;
};
