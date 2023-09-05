import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { config } from '../config/env';
import { HttpStatusCodes } from '../commonErrors/httpCode';
import { userEmail } from '../middlewares/verifyToken';
import { inviteAdminModel } from '../models/inviteAdmin';
import { isSuperAdmin } from '../utils/isSuperAdmin';
import { sendMail } from '../utils/mailSender';
import { Admin } from '../models/admin';




export const makeUserAdmin = async (req: Request, res: Response, next: NextFunction) =>{

    const { email } = req.body;

    console.log(userEmail)

    if(!isSuperAdmin(userEmail)){
        return res.status(403).json({"error": "Only a Super Admin can perform this action" });
    }

    const user = await User.findOne({email: email});
    const admin = await Admin.findOne({email: config.super_admin.email!})

    if(!user){
        return res.status(HttpStatusCodes.NOT_FOUND).json({"Error": `${ email } does not have an account, sign up with us.`});
    }

    try {
        sendMail(email, config.super_admin.email!)
        //the logic to change the invitationStatus to accepted || rejected
        const newInvite = new inviteAdminModel({
            userEmail: user.email,
            adminEmail: admin?.email
        })
        
        const validationError = newInvite.validateSync();

        if (validationError){
            return res.status(HttpStatusCodes.CONFLICT).json({error: 'missing required fields'});
        }

        const savedInvite = await newInvite.save();

        


        return res.status(HttpStatusCodes.CREATED).json({
            // admin: savedAdmin,
            invite: savedInvite
        })
          
    }catch (err) {
        console.log(err)
        return res.status(HttpStatusCodes.SERVER_ERROR).json({error: 'Internal Server error'})
  
    }

}

export const getAllAdmins = async (req: Request, res: Response, next: NextFunction) =>{
    
    try{
    const users = await Admin.find().select("-password");

    return res.status(200).json(users);
   }catch{
        return res.status(500).json({error: 'Internal server error'})
   }

}
