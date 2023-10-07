import { Router } from "express";
import { controllerHandler } from "src/core/middlewares/controllerHandlers";
import { upload } from "src/core/middlewares/file.handler";

export const fileRouter = Router();

fileRouter
  .post("/single-upload", upload.array("docs"))
  .get("/docs/:doc")
  .get("/docs")
  .delete("/docs");
