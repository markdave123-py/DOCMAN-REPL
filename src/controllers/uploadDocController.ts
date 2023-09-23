import { Request, Response, NextFunction } from "express";
import { DocModel } from "../models/doc";
import { metaDataModel } from "../models/metaData";
import { streamUploadFile } from "../utils/uploadUtils";
import { Category } from "../models/categories";
import { returnArray } from "../utils/docAccess";
// import fs from 'fs';
import { HttpStatusCodes } from "../commonErrors/httpCode";

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!
    // const isAdmin = currentUser.role === "admin"

    // if (!isSuperAdmin(currentUser.email) || !isAdmin) {
    //   return res
    //     .status(HttpStatusCodes.FORBIDDEN)
    //     .json({ error: "Only Admins can perform this action" });
    // }

    const { name, readAccess, writeAccess, deleteAccess, categoryName,departmentReadAccess, departmentWriteAccess, departmentDeleteAccess, forbiddenUsers, forbiddenDepartments } = req.body;

    const category = await Category.findOne({name: categoryName})

    if(!category || !categoryName) return res.status(404).json({

      message: "Invalid Category..."

    })
    const readAccessArray: string[] = returnArray(readAccess)
    const writeAccessArray: string[] = returnArray(writeAccess)
    const deleteAccessArray: string[] = returnArray(deleteAccess)
    const departmentReadAccessArray: string[] = returnArray(departmentReadAccess)
    const departmentWriteAccessArray: string[] = returnArray(departmentWriteAccess)
    const departmentDeleteAccessArray: string[] = returnArray(departmentDeleteAccess)
    const forbiddenUsersArray: string[] = returnArray(forbiddenUsers)
    const forbiddenDepartmentsArray: string[] = returnArray(forbiddenDepartments)

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const doc = await DocModel.findOne({name: name})

    if (doc) return res.status(HttpStatusCodes.CONFLICT).json({error: "Every document should have a unique name!!!"})

    const cloudinaryResponse: any = await streamUploadFile(file.buffer);

    // fs.unlinkSync(tempFilePath);
    
    const metaData = new metaDataModel({

      writeAccess: writeAccessArray,
      readAccess: readAccessArray,
      deleteAccess: deleteAccessArray,
      forbiddenUsers: forbiddenUsersArray,
      departmentReadAccess: departmentReadAccessArray,
      forbiddenDepartments:forbiddenDepartmentsArray,
      departmentDeleteAccess:departmentDeleteAccessArray,
      departmentWriteAccess: departmentWriteAccessArray,

    });

    await metaData.save();

    const document = new DocModel({
      name: name,
      category: category,
      cloudinaryId: cloudinaryResponse.public_id,
      path: cloudinaryResponse.secure_url,
      metaData: metaData,
    });

    await document.save();

    return res.status(201).json({ message: "Document uploaded successfully." });
  } catch (error) {
    console.error("Error uploading document:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};



