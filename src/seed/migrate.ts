import { pool } from "../db";
import logger from "../log/logger";

const createCategoryTable = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                parentCategoryId INTEGER REFERENCES categories(id) ON DELETE SET NULL,
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
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
                name VARCHAR(255) UNIQUE NOT NULL,
                categoryId INTEGER REFERENCES categories(id) ON DELETE CASCADE,
                description TEXT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    logger.info("🎉 Product Table Created!");
  } catch (error) {
    console.log("ERROR creation of PRODUCT table", error);
  }
};

const createUserRoleTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_role (
          id SERIAL PRIMARY KEY,
          role_name VARCHAR(255) UNIQUE NOT NULL
      );
    `);
    logger.info("🎉 User Role Table Created!");
  } catch (error) {
    console.log("ERROR creation of userRole table", error);
  }
};

const createUserTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid() ,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role_id INTEGER REFERENCES user_role(id) ON DELETE SET NULL DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    logger.info("🎉 User Table Created!");
  } catch (error) {
    console.log("ERROR creation of users table", error);
  }
};

const migrateDatabase = async () => {
  try {
    logger.info("🚀 Starting database migration...");
    // await createCategoryTable();
    // await createProductTable();
    // await createUserRoleTable();
    // await createUserTable();
    logger.info("🎉 Database migration completed!");
  } catch (error) {
    console.error("❌ Error during migration:", error);
  } finally {
    pool.end();
  }
};

migrateDatabase();
