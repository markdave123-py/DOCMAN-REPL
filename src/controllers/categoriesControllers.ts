import { Request, Response, NextFunction, request } from "express";
import { Category } from "../models/categories";
import { isSuperAdmin } from "../utils/isSuperAdmin";
// import fs from 'fs';
import { HttpStatusCodes } from "../commonErrors/httpCode";



export const createCategories =  async (req: Request, res: Response) =>{

  try {

    const { name } = req.body;

    const currentUser = req.user!
    const isAdmin = currentUser.role === "admin"

    if (!isSuperAdmin(currentUser.email) || !isAdmin) {
      return res
        .status(HttpStatusCodes.FORBIDDEN)
        .json({ error: "Only Admins can perform this action" });

    }
    
     const categoryExists = await Category.findOne({name: name})

     if(categoryExists) return res.status(400).json({
        message: "Bad request.."
     })

     const category = await Category.create({
        name: name
     })

     return res.status(200).json({

      message: "Created Successfully",
      category: category

    });

  } catch (error) {
    console.log(error)
    return res.status(HttpStatusCodes.SERVER_ERROR).json({
      error: "Internal server error.."
    })
  }

}


export const getCategories =  async (req: Request, res: Response) =>{
  try {
    
     const categories = await Category.find()

     return res.status(200).json({

      categories: categories,

    });

  } catch (error) {
    console.log(error)
    return res.status(HttpStatusCodes.SERVER_ERROR).json({
      error: "Internal server error.."
    })
  }

}