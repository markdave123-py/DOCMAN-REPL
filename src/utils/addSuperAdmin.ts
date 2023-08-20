import { Admin } from "../models/admin";
import { config } from "../config/env";
import { hashPassword } from "./hash";


export let  savedSuperAdmin1: any;
export const addAdminToDb = async () => {

    const allAdmin = await Admin.countDocuments();

        if (allAdmin === 0){

        const newAdmin = new Admin({
            firstName: config.super_admin.firstName,
            lastName: config.super_admin.lastName,
            phoneNumber: config.super_admin.phoneNumber,
            email: config.super_admin.email,
            password: hashPassword(config.super_admin.password!)
        });

        const savedSuperAdmin = await newAdmin.save();
        savedSuperAdmin1 = 'david'
        console.log(savedSuperAdmin);
            
        }

}