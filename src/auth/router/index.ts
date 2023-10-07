import { Router } from "express";
import { createNewUser, handleLogin, refreshToken } from "../services";
import {  signInSchema, signUpSchema } from "./schema";
import { controllerHandler } from "../../core/middlewares/controllerHandlers";
// import { createNewUserSchema, userLoginSchema } from "../validation/schema";
// import { getAllUsers } from "../auth/services/sign.up";

export const authRouter = Router();

// router.post("/users", controllerHandler(createNewUser, signUpSchema));
// router.post("/auth/users/login",
//   controllerHandler(handleLogin, signInSchema),
// );
// router.get("/users", controllerHandler(getAllUsers));

authRouter
    .post("/signup", controllerHandler(createNewUser, signUpSchema))
    .post("/signIn", controllerHandler(handleLogin, signInSchema))
    .post("/refresh", controllerHandler(refreshToken))