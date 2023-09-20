import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { config } from "../config/env";
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { userEmail } from "../middlewares/verifyToken";
import { inviteAdminModel } from "../models/inviteAdmin";
import { isSuperAdmin } from "../utils/isSuperAdmin";
import { sendMail } from "../utils/mailSender";
import { Admin } from "../models/admin";
import { Department } from "../models/department";

export const makeUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ Error: "User Email Required!!" });


  const currentUser = req.user!

  if (!isSuperAdmin(currentUser.email)) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: "Only a Super Admin can perform this action" });
  }

  const user = await User.findOne({ email: email });
  // const admin = await User.findOne({ email: currentUser.email, role: "admin" });

  if (!user) {
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ Error: `${email} does not have an account, sign up with us.` });
  }

  try {
    sendMail(email, currentUser.email);
    //the logic to change the invitationStatus to accepted || rejected
    const newInvite = new inviteAdminModel({
      userEmail: user.email,
      adminEmail: currentUser.email,
    });

    const validationError = newInvite.validateSync();

    if (validationError) {
      return res
        .status(HttpStatusCodes.CONFLICT)
        .json({ error: "missing required fields" });
    }

    const savedInvite = await newInvite.save();

    return res.status(HttpStatusCodes.CREATED).json({
      // admin: savedAdmin,
      invite: savedInvite,
    });
  } catch (err) {
    console.log(err)
    return res
      .status(HttpStatusCodes.SERVER_ERROR)
      .json({ error: "Internal Server error" });
  }
};

export const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  
  try {
    const currentUser = req.user!
    if(currentUser.role !== "admin") return res.status(HttpStatusCodes.FORBIDDEN).json("Only admin can perofrm this action..")
    const users = await User.find({role: "admin"}).select("-password");

    return res.status(HttpStatusCodes.OK).json(users);
  } catch {
    return res.status(HttpStatusCodes.SERVER_ERROR).json({ error: "Internal server error" });
  }
};
