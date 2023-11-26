import { Document } from "mongoose";
import { ImetaDataSchema } from "../../interface/metadata.interface";
import { ICategory } from "../../interface/category.interface";

export interface IdocSchema extends Document {
  name: string;
  cloudinaryId: string;
  path: string;
  category: ICategory;
  metaData: ImetaDataSchema; // Reference to the MetaData schema
  
}
