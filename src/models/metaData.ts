import { Schema, Document, model } from "mongoose";
import { ImetaDataSchema } from "../interface/metadata.interface";

export const metaDataSchema = new Schema<ImetaDataSchema>(
  {
    writeAccess: {
      type: [String],
    },
    readAccess: {
      type: [String],
    },
    deleteAccess: {
      type: [String],
    },
    forbiddenUsers: {
      type: [String],
    },
    //@ts-ignore
    departmentWriteAccess: {
      type: [String],
    },
    departmentReadAccess: {
      type: [String],
    },
    departmentDeleteAccess: {
      type: [String],
    },
    forbiddenDepartments: {
      type: [String],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  },
);

const metaDataModel = model<ImetaDataSchema>("MetaData", metaDataSchema);

export { metaDataModel };
