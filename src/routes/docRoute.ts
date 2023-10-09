import { Router } from "express";
import { controllerHandler } from "../core/config/middlewares/controllerHandlers";
import { getDocumments } from "../controllers/docController";
import { getOneDocument } from "../controllers/docController";
import { configUpload } from "../core/config/middlewares/configDoc";
import { uploadDocument } from "../controllers/uploadDocController";

const upload = configUpload();

export const docRoute = Router();

docRoute.get("/getAllDocs", controllerHandler(getDocumments));
docRoute.get("/getOneDoc/:name", controllerHandler(getOneDocument));
docRoute.post(
  "/upload",
  upload.single("file"),
  controllerHandler(uploadDocument),
);
