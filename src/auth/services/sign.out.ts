import { Request, Response } from "express";

export const signOut = async (req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.status(200).json({message: "Sign out successful"})
}