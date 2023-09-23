import { ICategory } from "./category.interface";

export interface ImetaDataSchema extends Document {
  writeAccess: string[];
  readAccess: string[];
  deleteAccess: string[];
  forbiddenUsers: string[];
  departmentWriteAccess: string[];
  departmentReadAccess: string[];
  departmentDeleteAccess: string[];
  forbiddenDepartments: string[];
}

