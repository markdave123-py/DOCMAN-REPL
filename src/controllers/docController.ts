import { Request, Response, NextFunction } from "express";
import { Admin } from "../models/admin";
import { DocModel } from "../models/doc";
import { userEmail } from "../middlewares/verifyToken";
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { hasDepartmentAcces, hasDocReadAccess } from "../utils/docAccess";
import { User } from "../models/user";

export const getDocumments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin = await Admin.findOne({ email: userEmail });
    const allDocs = await DocModel.find();

    // const documents = await DocModel.find({ "metaData.readAccess": userEmail });
    const documents = await DocModel.find()
    .or([{ "metaData.readAccess": userEmail }, {"metaData.departmentAccess": userEmail}]);

    if (!admin && !documents) {
      return res
        .status(403)
        .json({ message: "you cant perform this operation!!" });
    }
    // else if(admin && !documents){

    //     return res.status(HttpStatusCodes.CREATED).json({
    //          Docuements: allDocs
    //     })

    // }
    else if (!admin && documents) {
      return res.status(HttpStatusCodes.CREATED).json({
        Documents: documents,
      });
    } else {
      return res.status(HttpStatusCodes.CREATED).json({
        Documents: allDocs,
      });
    }
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export const getOneDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const name = req.params.name;

    const admin = await Admin.findOne({ email: userEmail });
    const doc = await DocModel.findOne({ name: name });

    const user = await User.findOne({ email: userEmail});
    console.log(user)

    if(!doc) return res.status(HttpStatusCodes.BAD_REQUEST).json({"Error": "Invalid, No Document with this name"})
    //|| hasDepartmentAcces(doc, user?.department.name)

    

    if (!admin && !hasDocReadAccess(doc, userEmail) && hasDepartmentAcces(doc, user?.department.name)) { 
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "you cant perform this action!!" });
    }

    return res.status(HttpStatusCodes.OK).json({
      Document: doc,
    });
  } catch (error) {
    console.log("Error retrieving documents:", error, error.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};
