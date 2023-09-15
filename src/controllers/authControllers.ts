import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { Admin } from "../models/admin";
import { genToken } from "../utils/genToken";
import { DocModel } from "../models/doc";
import { comparePassword } from "../utils/hash";

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required!!" });

  const user = await User.findOne({ email: email });
  

  if (!user) {

    console.log("Invalid Email..")

    return res
      .status(404)
      .json({
        message: `No user with this email ${email} please register then you can login`,
      });
    
  }

  const admin = await Admin.findOne({ email: email });

  const isPassowrdMatch = await comparePassword(password, user.password);

  if (isPassowrdMatch) {

    
    const accessToken = admin ? genToken(user.email, "admin") : genToken(user.email, "user");

    const docs = await DocModel.find({
      $or: [
        { "metaData.readAccess": { $in: [user.email] } },
        { "metaData.writeAccess": { $in: [user.email] } },
      ],
    });

    res.json({
      accessToken: accessToken,
      documents: docs,
      firstName: user.firstName,
            "email": user.email,
            // "role": user.role
    });
  } else {
    res.sendStatus(401).json({ message: "invalid credentials" });
  }

  //return all docs he has access to.
};
