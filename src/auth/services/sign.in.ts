import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import { genToken } from "../../core/utils/jwt";
import { DocModel } from "../../docs/models/doc";
import { comparePassword } from "../../core/utils/hash";
import { config } from "../../core/config/env";
import { sanitize } from "../../core/utils/Helper";
import { HttpStatusCodes } from "src/core/Errors/httpCode";


export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password required!!" });

    let user = await User.findOne({ email: email });
    
    if (!user) {
      console.log("Invalid Email..")
      return res.status(404).json({
          message: `No user with this email ${email} please register then you can login`,
        });  
    }

    
  
    const passowrdMatch = await comparePassword(password, user.password);

    if(!passowrdMatch) return res.status(403).json("Invalid credentials provided");


    const accessToken = genToken({email: user.email, role: user.role, department: user.department}, config.ACCESS_TOKEN_SECRET)
    const refreshToken = genToken({email: user.email, role: user.role, department: user.department}, config.REFRESH_TOKEN_SECRET)
    // const accessToken = user.genToken()
    const maxAgeInMilliseconds = 20 * 24 * 60 * 60 * 1000;

    res.cookie("refreshToken", refreshToken, {httpOnly: true, maxAge: maxAgeInMilliseconds})

    const docs = await DocModel.find({
        $or: [
          { "metaData.readAccess": { $in: [user.email] } },
          { "metaData.writeAccess": { $in: [user.email] } },
        ],
      });

    user = sanitize(user.toObject());

    res.json({
        code: HttpStatusCodes.OK,
        "message": "You are logged in...",
        data: {
          user,
          docs,
          tokens: {
            accessToken,
            refreshToken
          }
        }
              
      });
    
};
