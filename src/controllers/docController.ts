import { Request, Response, NextFunction } from "express";
import { Admin } from "../models/admin";
import { DocModel } from "../models/doc";
import { isAdminOrHasAccess } from "../utils/docAccess";
// import { currentUser!.email } from "../middlewares/verifyToken";
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { hasDepartmentAcces, hasDocReadAccess } from "../utils/docAccess";
import { User } from "../models/user";

export const getDocumments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // try {

  //   const currentUser = req.user!;

  //   const admin = await User.findOne({email: currentUser.email, role: "admin"})
  //   const allDocs = await DocModel.find();

  //   // const documents = await DocModel.find({ "metaData.readAccess": currentUser!.email });
  //   const documents = await DocModel.find()
  //   .or([{ "metaData.readAccess": currentUser.email }, {"metaData.departmentAccess": currentUser.email}]);

  //   if (!admin && !documents) {
  //     return res
  //       .status(403)
  //       .json({ message: "you cant perform this operation!!" });
  //   }
   
  //   else if (!admin && documents) {
  //     return res.status(HttpStatusCodes.CREATED).json({
  //       Documents: documents,
  //     });
  //   } else {
  //     return res.status(HttpStatusCodes.CREATED).json({
  //       Documents: allDocs,
  //     });
  //   }
  // } catch (error) {
  //   console.error("Error retrieving documents:", error);
  //   return res.status(500).json({ error: "Something went wrong." });
  // }

  try {
    const currentUser = req.user!

    const isAdmin = currentUser.role === "admin"

    const query = isAdmin 
    ? {}
    : {
      $or: [
        { "metaData.readAccess": currentUser.email }, 
        {"metaData.departmentAccess": currentUser.email}
      ]
    }
 
    const documents = await DocModel.find(query)

    if(!documents.length) return res.status(HttpStatusCodes.OK).json("You have not uploaded yet ...");

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
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: "You can't perform this action!" });
    }

    return res.status(HttpStatusCodes.OK).json({ Document: doc });
  } catch (error) {
    console.log("Error retrieving document:", error, error.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};
  // try {
  //   const name = req.params.name;
  //   const currentUser = req.user

  //   const admin = await Admin.findOne({ email: currentUser!.email });
  //   const doc = await DocModel.findOne({ name: name });

  //   const user = await User.findOne({ email: currentUser!.email});
  //   console.log(user)

  //   if(!doc) return res.status(HttpStatusCodes.BAD_REQUEST).json({"Error": "Invalid, No Document with this name"})
  //   //|| hasDepartmentAcces(doc, user?.department.name)

    

  //   if (!admin && !hasDocReadAccess(doc, currentUser!.email) && hasDepartmentAcces(doc, user?.department.name)) { 
  //     return res
  //       .status(HttpStatusCodes.UNAUTHORIZED)
  //       .json({ error: "you cant perform this action!!" });
  //   }

  //   return res.status(HttpStatusCodes.OK).json({
  //     Document: doc,
  //   });
  // } catch (error) {
  //   console.log("Error retrieving documents:", error, error.message);
  //   return res.status(500).json({ error: "Something went wrong." });
  // }

