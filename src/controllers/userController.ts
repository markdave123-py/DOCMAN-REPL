import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword} from '../utils/hash'



export const createNewUser = async (req: Request, res:Response, next: NextFunction) =>{
    try {

        const { firstName, lastName,phoneNumber, email,  password} = req.body;

        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashPassword(password)
        });
    
        const validationError = newUser.validateSync();

        if (validationError){
            return res.status(404).json({error: 'missing required fields'});
        }

        const savedUser = await newUser.save();
        return  res.status(201).json(savedUser);

    } catch (error) {
        console.error('Error saving this user', error)
        return res.status(500).json({error: "something went wrong"});
        
    }

}