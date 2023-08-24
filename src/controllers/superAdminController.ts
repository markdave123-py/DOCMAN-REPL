import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { config } from '../config/env';
import { HttpStatusCodes } from '../commonErrors/httpCode';
import { userEmail } from '../middlewares/verifyToken';
import { inviteAdminModel } from '../models/inviteAdmin';
import { isSuperAdmin } from '../utils/isSuperAdmin';
import { sendMail } from '../utils/mailSender';
import { Admin } from '../models/admin';
import { hashPassword } from '../utils/hash';



export const makeUserAdmin = async (req: Request, res: Response, next: NextFunction) =>{

    const { email } = req.body;

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
        userId: user.id,
        adminId: admin?.id
    })
        
        const validationError = newInvite.validateSync();

        if (validationError){
            return res.status(HttpStatusCodes.CONFLICT).json({error: 'missing required fields'});
        }

        const savedInvite = await newInvite.save();

        const adminPassword = await hashPassword(user.password)
        let savedAdmin;

        if (newInvite.invitationStatus === 'accepted'){
            const newAdmin = new Admin ({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: adminPassword

            })

            savedAdmin = await newAdmin.save();

        }else{
            //logic for rejected mails goes  , we can mail the mail just accept or nothing no reject tho
        }


        return res.status(HttpStatusCodes.CREATED).json({
            admin: savedAdmin,
            invite: newInvite
        })
          
    }catch (err) {
        console.log(err)
        return res.status(HttpStatusCodes.SERVER_ERROR).json({error: 'Internal Server error'})
  
    }

}
