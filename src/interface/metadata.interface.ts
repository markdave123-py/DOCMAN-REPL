import { ICategory } from "./category.interface";

export interface ImetaDataSchema extends Document {
  writeAccess: string[];
  readAccess: string[];
  deleteAccess: string[];
  departmentAccess: string[];
}
