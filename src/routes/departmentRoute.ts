import { Router } from "express";
import { controllerHandler } from "../middlewares/controllerHandlers";
import { getDepartments } from "../controllers/departmentController";


export const departmentRouter = Router();

departmentRouter.get('/departments', controllerHandler(getDepartments))

// uploadRouter.post('/', upload.single('file'), controllerHandler(uploadDocument));
