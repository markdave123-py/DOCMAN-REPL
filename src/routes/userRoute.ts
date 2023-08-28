import { Router } from "express";
import { createNewUser } from "../controllers/userController";
import { handleLogin } from "../controllers/authControllers";
import { createNewUserSchema, userLoginSchema } from "../validation/schema";
import { controllerHandler } from "../middlewares/controllerHandlers";
import { getAllUsers } from "../controllers/userController";



export const router = Router();

router.post('/auth/users', controllerHandler(createNewUser, createNewUserSchema));
router.post('/auth/users/login', controllerHandler(handleLogin, userLoginSchema));
router.get('/auth/users', controllerHandler(getAllUsers));