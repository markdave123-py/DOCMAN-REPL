import { Router } from "express";
import { getAllAdmins } from "../controllers/superAdminController";
import { makeUserAdmin } from "../controllers/superAdminController";
import { inviteAdmin } from "../controllers/inviteAdmin.controller";
import { controllerHandler } from "../middlewares/controllerHandlers";

export const adminRouter = Router();

adminRouter.get("/getAdmins", controllerHandler(getAllAdmins));
adminRouter.post("/inviteAdmin", controllerHandler(makeUserAdmin));
