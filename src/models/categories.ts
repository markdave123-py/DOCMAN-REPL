import { ICategory } from "../interface/category.interface";
import { Schema, model } from "mongoose";

export const categorySchema = new Schema<ICategory>(
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

export const Category = model<ICategory>("Category", categorySchema);
