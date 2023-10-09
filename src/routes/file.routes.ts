import { Router } from "express";
import { controllerHandler } from "src/core/config/middlewares/controllerHandlers";
import { upload } from "src/core/config/middlewares/file.handler";

export const fileRouter = Router();

fileRouter
  .post("/single-upload", upload.array("docs"))
  .get("/docs/:doc")
  .get("/docs")
  .delete("/docs");
