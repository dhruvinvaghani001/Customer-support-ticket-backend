import { z } from "zod";

const createUserSchema = {
  body: z.object({
    username: z
      .string({ required_error: "username is required!" })
      .min(3, "username sshould be at least 3 charcter long."),
    email: z
      .string({ required_error: "email is required!" })
      .email("invalid email formate"),
    password: z
      .string({ required_error: "password is required!" })
      .min(6, "password should be at least 6 charcter long!"),
  }),
};

const loginSchema = {
  body: createUserSchema.body.pick({ email: true, password: true }),
};

const updateUserRoleSchema = {
  params: z.object({
    id: z.string().uuid({ message: "invalid user Id Format" }),
  }),
  body: z.object({
    role: z.enum(["user", "support_agent", "technical_staff", "manager"], {
      message: "Invalid role provided",
    }),
  }),
};

const deleteUserSchema = {
  params: z.object({
    id: z.string().uuid({ message: "invalid user Id Format" }),
  }),
};

export {
  createUserSchema,
  loginSchema,
  updateUserRoleSchema,
  deleteUserSchema,
};
