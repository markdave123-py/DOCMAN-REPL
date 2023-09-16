import { NextFunction, Response, Request } from "express";
import { inviteAdminModel } from "../models/inviteAdmin";
import { HttpStatusCodes } from "../commonErrors/httpCode";
import { User } from "../models/user";
// import { Admin } from "../models/admin";

export const acceptInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const invite = await inviteAdminModel.findOne({ userEmail: email });

    if (!invite) {
    return res.status(HttpStatusCodes.CONFLICT).json({
      error: `No invitation was sent to ${email}`,
    });
  }

  // Update the invitationStatus to "accepted"
    const updatedInvite = await inviteAdminModel.updateOne(
          { userEmail: email },
          { $set: { invitationStatus: "accepted" } }
  );

    let updatedUser = await User.findOneAndUpdate(
      {email: email},
      {$set: {role: "admin"} },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      error: `User with email ${email} not found`,
    });
  }


    res.status(HttpStatusCodes.OK).json({
    message: `Invitation status and user role updated successfully`,
    user: updatedUser,
  });
    
  } catch (err) {
    console.error('Error updating invitation and user role', err);
    res.status(HttpStatusCodes.SERVER_ERROR).json("Internal server error!!!");
  }
};

export const rejectInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  //change staus to rejected

  const invite = inviteAdminModel.findOne({ userEmail: email });

  if (!invite) {
    return res.status(HttpStatusCodes.CONFLICT).json({
      error: `no invitaton was sent to ${email}`,
    });
  }

  const updatedInvite = await invite.updateOne({
    invitationStatus: "rejected",
  });

  return res
    .status(HttpStatusCodes.OK)
    .json({ message: `Invite is rejected by ${email}` });
};
