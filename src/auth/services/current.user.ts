import { NextFunction, Request, Response, RequestHandler } from "express";
import { config } from "../../core/config/env";
import { verifyToken } from "../../core/utils/jwt";
import { TokenUser } from "../../interface/token.user.interface";


declare global {
  namespace Express {
    export interface Request {
      user: TokenUser | null | undefined;
    }
  }
}

export const verifyJwt: RequestHandler =  (req: Request, res: Response, next: NextFunction) => {
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
        res.status(403).json("Invalid or Expired token....")
        next(err);
        return
        
    }

    const user: TokenUser = tokenDetails.user;
    req.user = user;
    next()

  
    
}


