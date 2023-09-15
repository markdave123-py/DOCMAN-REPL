import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {UNAUTHORIZED_ERROR, ForbiddenError } from "../commonErrors/Errors/Errors";
import { config } from "../config/env";

export let userEmail: string;

export const verifyJwt =  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers)
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log("user unauthorized..")
        return res.status(401).json({"message": "pls provide access token"})
        
    }
    const token = authHeader.split(' ')[1];


    // jwt.verify(
    //     token,
    //     `${process.env.ACCESS_TOKEN_SECRET}`,
    //     (err: any, decoded: any)=>{
    //         if(err) {
    //             res.json({
    //                 'message': 'Could not verify token try again later!!!'
    //             })
    //             console.log(err);
    //             throw new ForbiddenError("Could not verify token try again later!!!")
    //         };
            // req.user = decoded;
    //         next();      
            
    //     }  

    // )

    try {

        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
        req.user = decoded
        
    } catch (error) {
        console.log(error, error.message)
        res.status(400).json({"Eroor": "Invalid token..."})
    }






    
    
}