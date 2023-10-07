import { Request, Response, NextFunction } from "express";
import { genToken, verifyToken} from "../../core/utils/jwt";
import { config } from "../../core/config/env"


export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

    const currentUser = req.user!;

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({message: "You are not authenticated"})


    try {
        verifyToken(refreshToken, config.REFRESH_TOKEN_SECRET)
    } catch (error) {
        return res.status(403).json({message: "Invalid token"})
        
    }
    
    const accessToken = genToken(currentUser, config.ACCESS_TOKEN_SECRET)

    return res.status(200).json({message: "Token refreshed successfully", accessToken})

}