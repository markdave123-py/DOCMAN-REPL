import mongoose, { Schema } from "mongoose";
import { IUSER } from "../interface/user.interface";
import { departmentSchema } from "./department";

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
      type: departmentSchema,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    }
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUSER>("User", userSchema);
