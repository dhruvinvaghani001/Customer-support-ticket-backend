import { pool } from "../db";
import { Category } from "../types/types";
import { ApiError } from "../utils/ApiError";

const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const existCategoryQuery = `SELECT * from categories WHERE name=$1`;
  const categoryExist = await pool.query(existCategoryQuery, [category.name]);

  if (categoryExist?.rowCount! > 0) {
    throw new ApiError(409, "Category with same name alredy exist!");
  }

  const query = `INSERT INTO categories (name,parentCategoryId) VALUES ($1,$2) RETURNING id,name,parentcategoryid`;

  const values = [category.name, category?.parentCategoryId || null];
  const result = await pool.query(query, values);
  console.log(result);
  return result.rows[0];
};

const getCategories = async (): Promise<Category[]> => {
  const query = `SELECT c1.id,c1.name,c2.name as parentCategory FROM categories c1 LEFT JOIN categories c2 ON c1.parentcategoryid = c2.id ORDER BY c1.id ASC;`;
  const result = await pool.query(query);
  return result.rows;
};

const getSubCategories = async (categoryId: number): Promise<Category[]> => {
  const query = `SELECT c1.id,c1.name,c2.name as parentCategory FROM categories c1 LEFT JOIN categories c2 ON c1.parentcategoryid = c2.id WHERE c1.parentcategoryId = $1 ORDER BY c1.id ASC;`;
  const result = await pool.query(query, [categoryId]);
  return result.rows;
};

const getCategoryById = async (
  categoryId: number
): Promise<Category | null> => {
  const query = `SELECT * FROM categories WHERE id=$1`;
  const result = await pool.query(query, [categoryId]);
  if (result.rowCount == 0) {
    throw new ApiError(404, "Category Does not Found!");
  }
  return result.rows[0];
};

const updateCategory = async (
  categoryId: number,
  updates: Partial<Category>
): Promise<Category | null> => {
  const category = await getCategoryById(categoryId);

  const fields = Object.keys(updates) as (keyof Category)[];

  const setClause = fields
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");

  const query = `
    UPDATE categories
    SET ${setClause}
    WHERE id = $1
    RETURNING *;
  `;
  console.log(query);
  const values = [categoryId, ...fields.map((field) => updates[field])];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteCategory = async (categoryId: number): Promise<boolean> => {
  const exist = await getCategoryById(categoryId);
  if (!exist) {
    throw new ApiError(404, "Category does not exist!");
  }
  const query = `DELETE FROM categories WHERE id = $1 RETURNING id;`;
  const result = await pool.query(query, [categoryId]);
  return result.rowCount! > 0;
};

export {
  createCategory,
  getCategoryById,
  getCategories,
  getSubCategories,
  updateCategory,
  deleteCategory,
};
