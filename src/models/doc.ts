import mongoose, {Schema, Document, model} from 'mongoose';


export interface ImetaDataSchema extends Document {
  name: string;
  writers: string[]; 
  createdAt: Date;
  updatedAt: Date;
}


const metaDataSchema = new Schema<ImetaDataSchema>(
  {
    name: { 
        type: String, 
        required: true 
    },
    writers: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const metaDatak = model<ImetaDataSchema>('Book', metaDataSchema);
