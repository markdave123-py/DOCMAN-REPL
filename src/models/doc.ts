import {Schema, Document, model} from 'mongoose';
import { metaDataSchema } from './metaData';
import { IdocSchema } from '../interface/doc.interface';





export const docSchema = new Schema<IdocSchema>({
  name: { 
    type: String, 
    required: true ,
    unique: true
},
  cloudinaryId: { 
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
  metaData: {
    type: metaDataSchema,
    required: true
  },
  // Embed MetaData schema
});






export const DocModel = model<IdocSchema>('Doc', docSchema);

// export { DocModel }
