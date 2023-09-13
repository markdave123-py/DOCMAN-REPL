import { Admin } from "../models/admin";
import { config } from "../config/env";
import { hashPassword } from "./hash";
import { User } from "../models/user";

export const addAdminToDb = async () => {
  const allAdmin = await Admin.countDocuments();

  if (allAdmin === 0) {
    const hashedPassword = await hashPassword(config.super_admin.password!);

    const newAdmin = await Admin.create({
      firstName: config.super_admin.firstName,
      lastName: config.super_admin.lastName,
      phoneNumber: config.super_admin.phoneNumber,
      email: config.super_admin.email,
      password: hashedPassword,
    });

    const newuser = await User.create({
      firstName: config.super_admin.firstName,
      lastName: config.super_admin.lastName,
      phoneNumber: config.super_admin.phoneNumber,
      email: config.super_admin.email,
      password: hashedPassword,
    });

    return newAdmin;
  }
};
