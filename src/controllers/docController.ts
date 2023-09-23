import { Request, Response, NextFunction } from "express";
import { Admin } from "../models/admin";
import { DocModel } from "../models/doc";
import { isAdminOrHasAccess } from "../utils/docAccess";
import { getAccessibleDocuments } from "../utils/docAccess";
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { User } from "../models/user";

export const getDocumments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try {
    const currentUser = req.user!

    const documents = await DocModel.find(getAccessibleDocuments(currentUser))

    if(!documents.length) return res.status(HttpStatusCodes.OK).json("No Documents avaliable...");

    return res.status(HttpStatusCodes.OK).json({ Documents: documents });
  
  } catch (error) {

    console.error("Error retrieving documents:", error);
    return res.status(HttpStatusCodes.SERVER_ERROR).json({ error: "Something went wrong." });
    
  }
};

export const getOneDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    try {
    const name = req.params.name;
    const currentUser = req.user!;

    const doc = await DocModel.findOne({ name });

    if (!doc) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ Error: "Invalid, No Document with this name" });
    }

    if (!isAdminOrHasAccess(currentUser, doc)) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "You can't perform this action, Forbidden!" });
    }

    return res.status(HttpStatusCodes.OK).json({ 
      Document: doc 
    });
  } catch (error) {
    console.log("Error retrieving document:", error, error.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};
