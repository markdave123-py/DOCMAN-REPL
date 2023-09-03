import { NextFunction, Response, Request } from "express";
import { inviteAdminModel } from "../models/inviteAdmin";
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { User } from "../models/user";
import { Admin } from "../models/admin";


export const acceptInvitation = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const { email } = req.body;

    const invite = await inviteAdminModel.findOne({userEmail: email})
    const user = await User.findOne({email: email})

    if(!invite){
        return res.status(HttpStatusCodes.CONFLICT).json({
            error: `no invitaton was sent to ${email}`
        })
    
    }
    const updatedInvite  = await invite.updateOne({invitationStatus: "accepted"})

    const newAdmin = await Admin.create({
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                password: user?.password
        });


    return res.status(HttpStatusCodes.OK).json({
        newAdmin: {
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email,
                phoneNumber: user?.phoneNumber
        }
    })
    }catch(err){
        console.log(err, err.message)
        res.status(500).json("Internal server error!!!")

    }


}

export const rejectInvitation = async (req: Request, res: Response, next: NextFunction) => {

    const { email} = req.body;

    //change staus to rejected

    const invite = inviteAdminModel.findOne({userEmail: email})

    if(!invite){
        return res.status(HttpStatusCodes.CONFLICT).json({
            error: `no invitaton was sent to ${email}`
        })
    
    }

    const updatedInvite  = await invite.updateOne({invitationStatus: "rejected"});

    return res.status(HttpStatusCodes.OK).json({message: `Invite is rejected by ${email}`})

    
}