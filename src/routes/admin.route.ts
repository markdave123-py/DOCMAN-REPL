import { Router } from "express";
import { getAllAdmins } from "../controllers/superAdminController";
import { makeUserAdmin } from "../controllers/superAdminController";
import { createDepratment } from "../controllers/departmentController";
import { controllerHandler } from "../middlewares/controllerHandlers";
import { createCategories } from "../controllers/categoriesControllers";


export const adminRouter = Router();

adminRouter.get("/getAdmins", controllerHandler(getAllAdmins));
adminRouter.post("/inviteAdmin", controllerHandler(makeUserAdmin));
adminRouter.post("/createDepartment", controllerHandler(createDepratment));
adminRouter.post("/category", controllerHandler(createCategories))
