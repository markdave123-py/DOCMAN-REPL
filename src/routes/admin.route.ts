import { Router } from "express";
import { getAllAdmins } from "../controllers/superAdminController";
import { makeUserAdmin } from "../controllers/superAdminController";
import { controllerHandler } from "../middlewares/controllerHandlers";
import { createDepartment } from "../controllers/departmentController";

export const adminRouter = Router();

adminRouter.get("/getAdmins", controllerHandler(getAllAdmins));
adminRouter.post("/inviteAdmin", controllerHandler(makeUserAdmin));
adminRouter.post("/createDepartment", controllerHandler(createDepartment))
