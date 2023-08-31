import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { hashPassword} from '../utils/hash'



export const createNewUser = async (req: Request, res:Response, next: NextFunction) =>{
    try {

        const { firstName, lastName,phoneNumber, email,  password} = req.body;

        const user = await User.findOne({email: email})

        if (user) 
        {
            return res.status(403).json({"message": "user with this email alread exists"});

        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword
        });
    
        const validationError = newUser.validateSync();

        if (validationError){
            return res.status(404).json({error: 'missing required fields'});
        }

        const savedUser = await newUser.save();

        return  res.status(201).json({
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            id: savedUser.id,
            phoneNumber: savedUser.phoneNumber
        });

    } catch (error) {
        console.error('Error saving this user', error)
        return res.status(500).json({error: "something went wrong"});
        
    }

}

export const getAllUsers = async (req: Request, res:Response, next: NextFunction) =>{

   try{
    const users = await User.find().select('-password');
    if (users.length === 0 ){
        res.json({'message': 'No users yet.'})
    }


    return res.status(200).json({
        users: users
    }
    );
   }catch{
        return res.status(500).json({error: 'Internal server error'})
   }

}