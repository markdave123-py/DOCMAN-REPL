import { Department } from "../models/department";
import { NextFunction, Request, Response } from 'express';

export const getDepartments = async (req: Request, res: Response, next: NextFunction) => {

    const departments = await Department.find();

    return res.status(200).json({
        departments: departments
    })
}