import mongoose, { Schema, Document }from "mongoose";


interface IADMIN extends Document {
    firstName: string;
    lastName: string;
    email:  string;   
    phoneNumber: string;
    password: string

}


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
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
 
})

export const Admin = mongoose.model<IADMIN>("Admin", adminSchema);