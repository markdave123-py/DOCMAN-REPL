import mongoose, { Schema } from "mongoose";
import { IUSER } from "./user.entity.interface";
import { hashPassword, comparePassword } from "../../utils/hash";
// import { departmentSchema } from "./department";
// import jwt from "jsonwebtoken";
// import { config } from "../config/env";

export const userSchema = new Schema<IUSER>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    //@ts-ignore
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department'
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (this: IUSER, password: string) {
  try {
    return await comparePassword(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
}

userSchema.pre('save', async function (this:IUSER, next) {
  try { 

    // if(!this.isModified('password')) return ();

    const hashedPassword = await hashPassword(this.password);

    this.password = hashedPassword;

    next();
    
  } catch (error) {
    return next(error)
  };
    });
  // });
// userSchema.methods.genToken = function (this: IUSER) {
//   const token = jwt.sign({email: this.email, role: this.role}, config.ACCESS_TOKEN_SECRET, {expiresIn: "2d"});
//   return token
// }

export const User = mongoose.model<IUSER>("User", userSchema);
