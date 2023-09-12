export const hasDocReadAccess = (Doc: any, email: string): boolean => {
  if (Doc.metaData && Doc.metaData.readAccess) {
    return Doc.metaData.readAccess.includes(email);
  }

  return false;
};

export const hasDocWriteAccess = (Doc: any, email: string): boolean => {
  if (Doc.metaData && Doc.metaData.writeAccess) {
    return Doc.metaData.writeAccess.includes(email);
  }

  return false;
};

export const hasDocDeleteAccess = (Doc: any, email: string): boolean => {
  if (Doc.metaData && Doc.metaData.deleteAccess) {
    return Doc.metaData.deleteAccess.includes(email);
  }

  return false;
};

// const accessibleDocs = docs.filter((doc) => {
//   if (doc.metaData && doc.metaData.readAccess) {
//     return doc.metaData.readAccess.includes(emailToCheck);
//   }
//   return false;
// });
