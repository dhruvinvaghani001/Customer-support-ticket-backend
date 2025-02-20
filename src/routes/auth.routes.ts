import express from "express";

import { validateRequest } from "../middlewares/validation.middleware";
import { authorize } from "../middlewares/auth.middleware";

import { createUserSchema, loginSchema } from "../validators/user.schema";
import { login, logout, profile, signUp } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", validateRequest(createUserSchema), signUp);
router.post("/login", validateRequest(loginSchema), login);

router.post("/logout", logout);

router.use(authorize);
router.get("/me", authorize, profile);

export { router };
