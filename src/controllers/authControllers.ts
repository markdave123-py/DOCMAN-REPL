import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { NOT_FOUND } from '../commonErrors/Errors/Errors';
import { genToken } from '../utils/genToken';
import bcrypt from 'bcrypt';



export const handleLogin = async (req:Request, res:Response, next: NextFunction) =>{
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).json({"message": "Email and password required!!"});
    
    const user = await User.findOne({email: email})
    
    if(!user) {
        res.status(404).json({"message": `No user with this email ${ email } please register then you can login`})
        throw new NOT_FOUND("No user with this email please register then you can login");
    }
    
    const isPassowrdMatch = await bcrypt.compare(password, user.password);

    if( isPassowrdMatch) {
        const accessToken = genToken(user.email)
        
        res.json({"accessToken": accessToken});
    }else{
        res.sendStatus(401).json({message: "invalid credentials"});
    }
}

