import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { NOT_FOUND } from '../commonErrors/Errors/Errors';
import { genToken } from '../utils/genToken';
import { userEmail } from 'src/middlewares/verifyToken';
import { inviteAdminModel } from 'src/models/inviteAdmin';
import { isSuperAdmin } from 'src/utils/isSuperAdmin';

export const makeUserAdmin = (req: Request, res: Response, next: NextFunction) =>{

    const { email } = req.body;

    if(!isSuperAdmin(userEmail)){
        return res.status(403).json({"error": "Only a Super Admin can perform this action"});
    }

    const user = User.findOne({email: email});

    if(!user){
        return res.status(404).json({"Error": `${ email } does not have an account, let in sign up with us.`});
    }



}
