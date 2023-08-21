import mongoose, { Schema, Document }from "mongoose";


interface IUSER extends Document {
    firstName: string;
    lastName: string;
    email:  string;   
    phoneNumber: string;
    password: string

}


export const userSchema = new Schema<IUSER>({
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
    },

})

export const User = mongoose.model<IUSER>("User", userSchema);