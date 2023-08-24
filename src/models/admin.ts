import mongoose, { Schema, Document }from "mongoose";

import { IADMIN } from "./admin.interface";




export const adminSchema = new Schema<IADMIN>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
 
})

export const Admin = mongoose.model<IADMIN>("Admin", adminSchema);