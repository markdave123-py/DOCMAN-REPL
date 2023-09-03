import  {Schema, Document, model} from 'mongoose';


export interface ImetaDataSchema extends Document {

  writeAccess: string[]; 
  readAccess: string[];
  deleteAccess: string[];
  createdAt: Date;
  updatedAt: Date;
}


export const metaDataSchema = new Schema<ImetaDataSchema>(
  {
    
    writeAccess: 
        [
            { type: String, 
              
            }
        ],
    readAccess:[
            { type: String, 
              
            }
        ],
      deleteAccess: [
            { type: String, 
              
            }
        ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const metaDataModel = model<ImetaDataSchema>('MetaData', metaDataSchema);

export { metaDataModel }

