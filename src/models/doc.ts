import {Schema, Document, model} from 'mongoose';
import { ImetaDataSchema, metaDataSchema } from './metaData';


export interface IdocSchema extends Document {
  name: string;
  id: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  metaData:  ImetaDataSchema; // Reference to the MetaData schema
}



const docSchema = new Schema<IdocSchema>({
  name: { 
    type: String, 
    required: true 
},
  id: { 
    type: String, 
    required: true 
},
  path: { 
    type: String, 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now },
  updatedAt: { 
    type: Date, 
    default: Date.now 
},
  metaData: metaDataSchema, // Embed MetaData schema
});






const docModel = model<IdocSchema>('Doc', docSchema);

export { docModel }
