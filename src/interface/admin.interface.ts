import { Document } from "mongoose";



export interface IADMIN extends Document {
    firstName: string;
    lastName: string;
    email:  string;   
    phoneNumber: string;
    password: string

}