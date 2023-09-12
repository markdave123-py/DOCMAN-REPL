import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UNAUTHORIZED_ERROR, ForbiddenError } from '../commonErrors/Errors/Errors';


export let userEmail: string ;

export const verifyJwt =  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers)
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({"message": "pls provide access token"})
        throw new UNAUTHORIZED_ERROR("User Unauthorized");
    }
    const token = authHeader.split(' ')[1];


    jwt.verify(
        token,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        (err: any, decoded: any)=>{
            if(err) {
                res.json({
                    'message': 'Could not verify token try again later!!!'
                })
                console.log(err);
                throw new ForbiddenError("Could not verify token try again later!!!")
            };
            userEmail = decoded.username;
            next();
            
            
        }  

    )


    
    
}