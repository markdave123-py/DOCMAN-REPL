import { IdocSchema } from "../interface/doc.interface";


export const hasDocReadAccess = (Doc: IdocSchema, email: string): boolean => {
  if (Doc.metaData && Doc.metaData.readAccess) {
    return Doc.metaData.readAccess.includes(email);
  }

  return false;
};

export const hasDocWriteAccess = (Doc: IdocSchema, email: string): boolean => {
  if (Doc.metaData && Doc.metaData.writeAccess) {
    return Doc.metaData.writeAccess.includes(email);
  }

  return false;
};

export const hasDocDeleteAccess = (Doc: IdocSchema, email: string): boolean => {
  if (Doc.metaData && Doc.metaData.deleteAccess) {
    return Doc.metaData.deleteAccess.includes(email);
  }

  return false;
};




export const hasDepartmentAcces = (Doc: IdocSchema, departmentName: any) =>{
  if(Doc.metaData && Doc.metaData.departmentAccess) return Doc.metaData.departmentAccess.includes(departmentName)
}

// const accessibleDocs = docs.filter((doc) => {
//   if (doc.metaData && doc.metaData.readAccess) {
//     return doc.metaData.readAccess.includes(emailToCheck);
//   }
//   return false;
// });
