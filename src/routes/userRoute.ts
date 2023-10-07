import { Router } from "express";
import { createNewUser } from "../auth/services/sign.up";
import { handleLogin } from "../auth/services/sign.in";
import { createNewUserSchema, userLoginSchema } from "../core/validation/schema";
import { controllerHandler } from "../core/middlewares/controllerHandlers";
import { getAllUsers } from "../auth/services/sign.up";

export const router = Router();

router.post("/users", controllerHandler(createNewUser, createNewUserSchema));
router.post(
  "/auth/users/login",
  controllerHandler(handleLogin, userLoginSchema),
);
router.get("/users", controllerHandler(getAllUsers));
