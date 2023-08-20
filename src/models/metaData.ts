import  {Schema, Document, model} from 'mongoose';


export interface ImetaDataSchema extends Document {
  name: string;
  writerAccess: string[]; 
  readAccess: string[];
  deleteAccess: string[];
  createdAt: Date;
  updatedAt: Date;
}


export const metaDataSchema = new Schema<ImetaDataSchema>(
  {
    name: { 
        type: String, 
        required: true 
    },
    writerAccess: 
        [
            { type: String, 
              required: true 
            }
        ],
    readAccess:[
            { type: String, 
              required: true 
            }
        ],
      deleteAccess: [
            { type: String, 
              required: true 
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

