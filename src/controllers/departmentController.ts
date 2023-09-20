import { Department } from "../models/department";
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { isSuperAdmin } from "../utils/isSuperAdmin";



export const getDepartments = async (req: Request, res: Response, next: NextFunction) => {

    const departments = await Department.find();

    return res.status(200).json({
        departments: departments
    })
}



export const createDepratment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;

    if (!name)
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ Error: "Department Name Required...." });


    const currentUser = req.user!

    if (!isSuperAdmin(currentUser.email))
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "You can't perform this action..." });

    const newDepartment = new Department({
      name: name,
    });

     await newDepartment.save();

    return res.status(HttpStatusCodes.CREATED).json({
      Department: newDepartment,
    });
  } catch (error) {
    console.log(error)
    res.status(HttpStatusCodes.SERVER_ERROR)
  }
};
