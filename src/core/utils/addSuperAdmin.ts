import { config } from "../config/env";
import { hashPassword } from "./hash";
import { User } from "../../models/user";
import { Department } from "../../models/department";
import { Category } from "../../models/categories";

export const addAdminToDb = async () => {
  const allAdmin = await User.countDocuments({role: "admin"});alid_palindrome
  const department = await Department.findOne({name: config.DEFAULT_DEPARTMENT})

  if (allAdmin === 0) {
    const hashedPassword = await hashPassword(config.super_admin.password!);

    // const newAdmin = await Admin.create({
    //   firstName: config.super_admin.firstName,
    //   lastName: config.super_admin.lastName,
    //   phoneNumber: config.super_admin.phoneNumber,
    //   email: config.super_admin.email,
    //   password: hashedPassword,
    // });

    const newuser = await User.create({
      firstName: config.super_admin.firstName,
      lastName: config.super_admin.lastName,
      phoneNumber: config.super_admin.phoneNumber,
      email: config.super_admin.email,
      password: hashedPassword,
      department: department,
      role: "admin"
    });

    return newuser;
  }
};

export const defaultCategory = async () =>{

  const allCategories = await Category.countDocuments();

  if (allCategories === 0){

        const newCategories = await Category.create({
            name: config.DEFAULT_CATEGORY
        })

        return newCategories

    }

}
