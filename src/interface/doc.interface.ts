import { Document } from "mongoose";
import { ImetaDataSchema } from "./metadata.interface";
import { ICategory } from "./category.interface";

export interface IdocSchema extends Document {
  name: string;
  cloudinaryId: string;
  path: string;
  category: ICategory;
  metaData: ImetaDataSchema; // Reference to the MetaData schema
  
}
