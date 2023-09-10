export interface ImetaDataSchema extends Document {

  writeAccess: string[]; 
  readAccess: string[];
  deleteAccess: string[];
  createdAt: Date;
  updatedAt: Date;
}