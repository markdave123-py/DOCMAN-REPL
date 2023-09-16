import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword} from '../utils/hash'
import { Department } from '../models/department';
import { HttpStatusCodes } from '../commonErrors/httpCode';

export const createNewUser = async (req: Request, res: Response, next: NextFunction,) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      departmentName,
    } = req.body;

    const user = await User.findOne({ email: email });

    if (user) 
        {
            return res.status(HttpStatusCodes.CONFLICT).json({"Error": "Bad request!!"});
        }
      
          const department = await Department.findOne({ name: departmentName });


        if (!department) 
        {
            return res.status(HttpStatusCodes.CONFLICT).json({"Error": "Bad request, Invalid Department !!"});
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword,
            department: department
        });
    
        
        const savedUser = await newUser.save();

        return  res.status(201).json({
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            id: savedUser.id,
            phoneNumber: savedUser.phoneNumber,
            department: savedUser.department
            
        });

    } catch (error) {
        return res.status(500).json({error: `something went wrong ${error}`});
        
    }

    
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
      res.json({ message: "No users yet." });
    }

    return res.status(200).json({
      users: users,
    });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};
