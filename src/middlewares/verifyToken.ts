import { NextFunction, Request, Response } from "express";
import { config } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { TokenUser } from "../interface/token.user.interface";

export let userEmail: string;


export const verifyJwt =  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    let tokenDetails;
    try {
        if (!authHeader) {
        console.log("user unauthorized..")
        return res.status(401).json({"message": "pls provide access token"})
        
    }
    const token = authHeader.split(' ')[1];

    tokenDetails = verifyToken(token, config.ACCESS_TOKEN_SECRET)

    } catch (err: any) {
        req.user =  null
        console.log(err.message, err)
        res.status(400).json("Error with token verification....")
        next(err);
        return
        
    }

    const user: TokenUser = tokenDetails.user;
    req.user = user;
    next()

  
    
}

  // try {

    //     const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
    //     req.user = decoded
        
    // } catch (error) {
    //     console.log(error, error.message)
    //     res.status(400).json({"Eroor": "Invalid token..."})
    // }

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

