import { Router } from "express";
import { controllerHandler } from "src/middlewares/controllerHandlers";
import { upload } from "src/middlewares/file.handler";

export const fileRouter = Router();


fileRouter
    .post('/single-upload', upload.array('docs'))
    .get('/docs/:doc')
    .get('/docs')
    .delete('/docs')
    