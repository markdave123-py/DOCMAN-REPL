import { NextFunction, Response, Request } from "express";


export const acceptInvitation = async (req: Request, res: Response, next: NextFunction) => {

    const { accepted, email } = req.body;

    //changee status to accepts and add email to admindb

}

export const rejectInvitation = async (req: Request, res: Response, next: NextFunction) => {

    const { rejected } = req.body;

    //change staus to rejected
    
}