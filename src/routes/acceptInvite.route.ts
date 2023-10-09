import { Router } from "express";
import {
  acceptInvitation,
  rejectInvitation,
} from "../controllers/accept.invitation";
import { controllerHandler } from "../core/config/middlewares/controllerHandlers";

export const inviteRoute = Router();

inviteRoute.post("/acceptInvite", controllerHandler(acceptInvitation));
inviteRoute.post("/rejectInvite", controllerHandler(rejectInvitation));
