import { Router } from "express";
import { controllerHandler } from "../middlewares/controllerHandlers";
import { getDocumments } from "../controllers/docController";
import { getOneDocument } from "../controllers/docController";
import { configUpload } from "../middlewares/configDoc";
import { uploadDocument } from "../controllers/uploadDocController";

const upload = configUpload();



export const docRoute = Router();

docRoute.post('/getAllDocs', controllerHandler(getDocumments));
docRoute.post('/getOneDocs', controllerHandler(getOneDocument));
docRoute.post('/upload', upload.single('file'), controllerHandler(uploadDocument)); 