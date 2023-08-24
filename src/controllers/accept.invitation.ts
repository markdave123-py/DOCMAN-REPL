import { NextFunction, Response, Request } from "express";


export const acceptInvitation = async (req: Request, res: Response, next: NextFunction) => {

    const { accepted } = req.body;

}

export const rejectInvitation = async (req: Request, res: Response, next: NextFunction) => {

    const { rejected } = req.body;
    
}