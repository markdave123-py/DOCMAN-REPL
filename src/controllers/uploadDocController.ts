import { Request, Response, NextFunction } from "express";
import { DocModel } from "../models/doc";
import { metaDataModel } from "../models/metaData";
import { streamUploadFile } from "../utils/uploadUtils";
import { isSuperAdmin } from "../utils/isSuperAdmin";
import { userEmail } from "../middlewares/verifyToken";
import { Admin } from "../models/admin";
// import fs from 'fs';
import { HttpStatusCodes } from "../commonErrors/httpCode";




export const uploadDocument = async (req: Request, res:Response) => {

    try {

        const admin = await Admin.findOne({email: userEmail})

        if ( !isSuperAdmin(userEmail) && !admin){
            return res.status(HttpStatusCodes.FORBIDDEN).json({"error": "Only Admins can perform this action"});
        }

        const {name, readAccess, writeAccess, deleteAccess, departmentAccess} = req.body;
        const readAccessArray: string[] = Array.isArray(readAccess) ? readAccess : [];
        const writeAccessArray: string[] = Array.isArray(writeAccess) ? writeAccess : [];
        const deleteAccessArray: string[] = Array.isArray(deleteAccess) ? deleteAccess : [];
        const departmentAccessArray: string[] = Array.isArray(departmentAccess) ? departmentAccess : [];


        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        

        const cloudinaryResponse: any = await streamUploadFile(file.buffer);

        // fs.unlinkSync(tempFilePath);

        const metaData = new metaDataModel({
            writeAccess: writeAccessArray,
            readAccess: readAccessArray,
            deleteAccess: deleteAccessArray,
            departmentAccess: departmentAccessArray
        });

        await metaData.save();

        const document = new DocModel({
            name: name,
            cloudinaryId: cloudinaryResponse.public_id,
            path: cloudinaryResponse.secure_url,
            metaData: metaData
        });

        await document.save();

        return res.status(201).json({ message: 'Document uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading document:', error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
}
