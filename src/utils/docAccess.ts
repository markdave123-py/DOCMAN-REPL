import { IdocSchema } from "../models/doc.interface";

export const hasDocAccess = ( Doc: IdocSchema, email: string ) =>{

    const docAccess =  Doc.metaData.readAccess.find((accessEmail) => accessEmail === email )

    return docAccess

}