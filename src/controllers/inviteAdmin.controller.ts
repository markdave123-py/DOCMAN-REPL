import { NextFunction, Response, Request } from "express";
import { HttpStatusCodes } from "src/commonErrors/httpCode";
import { config } from "src/config/env";
import { User } from "src/models/user";
import { sendMail } from "src/utils/mailSender";



export const inviteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const superAdminEmail = config.super_admin.email as string;

    const user = await User.findOne({ email });
    if(!user)
        throw new Error("User not found in the system");

    Promise.resolve(
        sendMail(user.email, superAdminEmail)
    )

    res.status(HttpStatusCodes.OK).json({
        message: "Invitation successfully sent"
    })

}   