import { NextFunction, Response, Request } from "express";
import { inviteAdminModel } from "../models/inviteAdmin";
import { HttpStatusCodes } from "../commonErrors/httpCode";


export const acceptInvitation = async (req: Request, res: Response, next: NextFunction) => {

    const { accepted, email } = req.body;

    const invite = inviteAdminModel.findOne({userEmail: email})

    if(!invite){
        return res.status(HttpStatusCodes.CONFLICT).json({
            error: `no invitaton was sent to ${email}`
        })
    
    }
    const updatedInvite  = await invite.updateOne({invitationStatus: accepted});

    return res.status(HttpStatusCodes.OK).json({
        updatedInvite: updatedInvite
    })


}

export const rejectInvitation = async (req: Request, res: Response, next: NextFunction) => {

    const { email, rejected } = req.body;

    //change staus to rejected

    const invite = inviteAdminModel.findOne({userEmail: email})

    if(!invite){
        return res.status(HttpStatusCodes.CONFLICT).json({
            error: `no invitaton was sent to ${email}`
        })
    
    }

    const updatedInvite  = await invite.updateOne({invitationStatus: rejected});

    return res.status(HttpStatusCodes.OK).json({
        updatedInvite: updatedInvite
    })

    
}