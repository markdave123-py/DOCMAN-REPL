import { Router } from "express";
import { controllerHandler } from "../core/middlewares/controllerHandlers";
import { getDepartments } from "../controllers/departmentController";
import { getCategories } from "../controllers/categoriesControllers";


export const departmentRouter = Router();

departmentRouter.get('/departments', controllerHandler(getDepartments))
departmentRouter.get('/category', controllerHandler(getCategories))

// uploadRouter.post('/', upload.single('file'), controllerHandler(uploadDocument));
