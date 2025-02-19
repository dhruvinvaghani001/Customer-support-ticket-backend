import { pool } from "../db";
import logger from "../log/logger";

const createCategoryTable = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) UNIQUE NOT NULL,
                parentCategoryId UUID REFERENCES categories(id) ON DELETE SET NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    logger.info("🎉 Cateogry Table Created!");
  } catch (error) {
    console.log("ERROR creation of CATEGORY Table", error);
  }
};

const createProductTable = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id UUID PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                categoryId UUID REFERENCES categories(id) ON DELETE CASCADE,
                description TEXT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    logger.info("🎉 Product Table Created!");
  } catch (error) {
    console.log("ERROR creation of PRODUCT table", error);
  }
};

const migrateDatabase = async () => {
  try {
    logger.info("🚀 Starting database migration...");
    await createCategoryTable();
    await createProductTable();
    logger.info("🎉 Database migration completed!");
  } catch (error) {
    console.error("❌ Error during migration:", error);
  } finally {
    pool.end();
  }
};

migrateDatabase();
