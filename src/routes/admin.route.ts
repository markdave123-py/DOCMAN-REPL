import { Router } from "express";
import { getAllAdmins } from "../controllers/superAdminController";
import { makeUserAdmin, createDepratment } from "../controllers/superAdminController";
import { controllerHandler } from "../middlewares/controllerHandlers";


export const adminRouter = Router();

adminRouter.get("/getAdmins", controllerHandler(getAllAdmins));
adminRouter.post("/inviteAdmin", controllerHandler(makeUserAdmin));
adminRouter.post("/createDepartment", controllerHandler(createDepratment));
