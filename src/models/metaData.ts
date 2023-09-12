import  {Schema, Document, model} from 'mongoose';
import { ImetaDataSchema } from '../interface/metadata.interface';





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

      departmentAccess:{
        type: [String],
        required: true
      },
    
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const metaDataModel = model<ImetaDataSchema>('MetaData', metaDataSchema);

export { metaDataModel }

