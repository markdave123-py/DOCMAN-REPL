import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { genToken } from "../utils/jwt";
import { DocModel } from "../models/doc";
import { comparePassword } from "../utils/hash";
import { config } from "../config/env";


export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password required!!" });

    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log("Invalid Email..")
      return res.status(404).json({
          message: `No user with this email ${email} please register then you can login`,
        });  
    }

    const passowrdMatch = await comparePassword(password, user.password);

    if(!passowrdMatch) return res.status(403).json("Invalid credentials provided");


    const accessToken = genToken({email: user.email, role: user.role}, config.ACCESS_TOKEN_SECRET)
    // const accessToken = user.genToken()

    const docs = await DocModel.find({
        $or: [
          { "metaData.readAccess": { $in: [user.email] } },
          { "metaData.writeAccess": { $in: [user.email] } },
        ],
      });

    res.json({
        "message": "You are logged in...",
        accessToken: accessToken,
        documents: docs,
        firstName: user.firstName,
        email: user.email,
        role: user.role
              
      });
    
};
