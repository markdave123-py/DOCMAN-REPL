import { Schema, model } from "mongoose";
import { metaDataSchema } from "./metaData";
import { IdocSchema } from "../interface/doc.interface";

export const docSchema = new Schema<IdocSchema>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    //@ts-ignore
    metaData: {
      type: metaDataSchema,
      required: true,
    },
    // Embed MetaData schema
  },
  {
    timestamps: true,
  },
);

export const DocModel = model<IdocSchema>("Doc", docSchema);

// export { DocModel }
