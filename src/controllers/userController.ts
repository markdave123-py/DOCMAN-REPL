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
            return res.status(HttpStatusCodes.CONFLICT).json({"Error": "Bad request!!, you already have an account with us.."});
        }
      
    const department = await Department.findOne({ name: departmentName });


    if (!department) 
        {
            return res.status(HttpStatusCodes.CONFLICT).json({"Error": "Bad request, Invalid Department !!"});
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword,
            department: department
        });
    
        
        // const newUser = await newUser.save();

        return  res.status(201).json({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            id: newUser.id,
            phoneNumber: newUser.phoneNumber,
            department: newUser.department
            
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: `something went wrong, couldn't register user..`});
        
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
      return res.json({ message: "No users yet." });
    }

    return res.status(200).json({
      users: users,
    });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};
