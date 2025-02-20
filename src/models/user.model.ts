import { pool } from "../db";
import { User } from "../types/types";
import { ApiError } from "../utils/ApiError";

import bcrypt from "bcryptjs";

const findUserByID = async (userId: string): Promise<User | null> => {
  const query = `SELECT * from users where id=$1`;
  const result = await pool.query(query, [userId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

const findUserByUsernameOrEmail = async ({
  username,
  email,
}: {
  username?: string;
  email: string;
}): Promise<User | null> => {
  const query = `
    SELECT 
      users.*, 
      user_role.role_name AS role 
    FROM users 
    LEFT JOIN user_role ON users.role_id = user_role.id
    WHERE users.username = $1 OR users.email = $2 
    LIMIT 1;
  `;
  const result = await pool.query(query, [username, email]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

const createUser = async (
  user: Omit<User, "id" | "createdAt" | "role_id">
): Promise<User | null> => {
  const query = `INSERT INTO users (username, email, password) 
       VALUES ($1, $2, $3) RETURNING id,username,email,role_id;`;
  const hashPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(query, [
    user.username,
    user.email,
    hashPassword,
  ]);
  return result.rows[0];
};

const updateUserRole = async (
  userId: string,
  role: string
): Promise<User | null> => {
  const roles = ["user", "support_agent", "technical_staff", "manager"];
  if (!roles.includes(role)) {
    throw new ApiError(400, "Provided role is not valid!");
  }
  const roleQuery = `SELECT id FROM user_role WHERE role_name = $1;`;
  const roleResult = await pool.query(roleQuery, [role]);

  if (roleResult.rows.length === 0) {
    throw new ApiError(400, "Role not found in db!");
  }

  const roleId = roleResult.rows[0].id;

  const query = `UPDATE users SET role_id=$1 WHERE id=$2 RETURNING id,username,email,role_id;`;

  const result = await pool.query(query, [roleId, userId]);

  if (result.rows.length === 0) {
    throw new ApiError(404, "User not found");
  }

  return result.rows[0];
};

const deleteUserDB = async (userId: string): Promise<boolean> => {
  const existUser = await findUserByID(userId);
  if (!existUser) {
    throw new ApiError(404, "user does not exist!");
  }
  const query = `DELETE FROM users where id=$1 RETURNING id;`;
  const result = await pool.query(query, [userId]);
  if (result.rowCount == 0) {
    throw new ApiError(404, "user does not found!");
  }
  return result.rowCount! > 0;
};

export {
  createUser,
  findUserByUsernameOrEmail,
  updateUserRole,
  deleteUserDB,
  findUserByID,
};
