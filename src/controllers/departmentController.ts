import { Department } from "../models/department";
import { NextFunction, Request, Response } from 'express';
import { userEmail } from "../middlewares/verifyToken";
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { isSuperAdmin } from "../utils/isSuperAdmin";
import { TokenUser } from "../interface/token.user.interface";




export const getDepartments = async (req: Request, res: Response, next: NextFunction) => {

    const departments = await Department.find();

    return res.status(200).json({
        departments: departments
    })
}