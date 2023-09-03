import { Router } from "express";
import { configUpload } from "../middlewares/configDoc";
import { controllerHandler } from "../middlewares/controllerHandlers";
import { uploadDocument } from "../controllers/uploadDocController";

const upload = configUpload()
export const uploadRouter = Router();




// uploadRouter.post('/', upload.single('file'), controllerHandler(uploadDocument)); 