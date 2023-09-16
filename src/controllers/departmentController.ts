import { Department } from "../models/department";
import { NextFunction, Request, Response } from 'express';
import { userEmail } from "../middlewares/verifyToken";
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { isSuperAdmin } from "../utils/isSuperAdmin";
import { TokenUser } from "../interface/token.user.interface";



export const createDepartment = async ( req: Request, res: Response, next: NextFunction ) =>{

   try {
    const currentUser = req.user;
     const { departmentName } = req.body;

    if(!departmentName) return res.status(HttpStatusCodes.UNPROCESSIBLE).json({"Error": "Department name required"});

    if(!isSuperAdmin(currentUser!.email)) return res.status(HttpStatusCodes.UNAUTHORIZED).json({"Error": "Unauthorized!! "});

    const newDepartment = await Department.create({
        name: departmentName 
    })

    return res.status(HttpStatusCodes.CREATED).json({
        Department: newDepartment
    })

   } catch (error) {

        console.error(error)
        return res.status(HttpStatusCodes.SERVER_ERROR).json({"Error": "Internal server error!!! "})  
   }



}

export const getDepartments = async (req: Request, res: Response, next: NextFunction) => {

    const departments = await Department.find();

    return res.status(200).json({
        departments: departments
    })
}