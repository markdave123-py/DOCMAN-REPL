
export const hasDocAccess = ( Doc: any, email: string ): boolean =>{

    if (Doc.metaData && Doc.metaData.readAccess){
        return Doc.metaData.readAccess.includes(email)
    }

    return false 

}


// const accessibleDocs = docs.filter((doc) => {
//   if (doc.metaData && doc.metaData.readAccess) {
//     return doc.metaData.readAccess.includes(emailToCheck);
//   }
//   return false;
// });
