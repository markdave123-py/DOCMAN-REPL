import { Document } from "mongoose";
import { ImetaDataSchema } from "./metadata.interface";

export interface IdocSchema extends Document {
  name: string;
  cloudinaryId: string;
  path: string;
  metaData: ImetaDataSchema; // Reference to the MetaData schema
}
