import { Router } from "express";
import { createNewUser } from "../controllers/userController";
import { handleLogin } from "../controllers/authControllers";
import { createNewUserSchema, userLoginSchema } from "../validation/schema";
import { controllerHandler } from "../middlewares/controllerHandlers";



export const router = Router();

router.post('/auth/users', controllerHandler(createNewUser, createNewUserSchema));
router.post('/auth/users/login', controllerHandler(handleLogin, userLoginSchema));