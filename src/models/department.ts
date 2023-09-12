import { IDepartment } from "../interface/department.interface";
import { Schema, model } from "mongoose";

export const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Department = model<IDepartment>("Department", departmentSchema);
