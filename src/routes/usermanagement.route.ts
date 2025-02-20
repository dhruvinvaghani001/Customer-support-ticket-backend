import express from "express";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  deleteUserSchema,
  updateUserRoleSchema,
} from "../validators/user.schema";
import { deleteUser, editUserRole } from "../controllers/user.controller";
import { RoleBasedAuthorise } from "../middlewares/auth.middleware";

const router = express.Router();

// only admin can change role and delete user
router.use(RoleBasedAuthorise(["admin"]));

router.post(
  "/update-role/:id",
  validateRequest(updateUserRoleSchema),
  editUserRole
);

router.delete("/:id", validateRequest(deleteUserSchema), deleteUser);

export { router };
