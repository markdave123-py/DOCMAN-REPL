import { IdocSchema } from "../interface/doc.interface";
import { TokenUser } from "../interface/token.user.interface";
import { User } from "../models/user";



export const hasDocReadAccess = (doc: IdocSchema, email: string): boolean => {
  return doc?.metaData?.readAccess?.includes(email) ?? false;
};

export const hasDocWriteAccess = (doc: IdocSchema, email: string): boolean => {
  return doc?.metaData?.writeAccess?.includes(email) ?? false;
};

export const hasDocDeleteAccess = (doc: IdocSchema, email: string): boolean => {
  return doc?.metaData?.deleteAccess?.includes(email) ?? false;
};

export const hasDepartmentAcces = (doc: IdocSchema, departmentName: any): boolean => {
  return doc?.metaData?.departmentAccess?.includes(departmentName) ?? false;
};

export const isAdminOrHasAccess = async (user: TokenUser, doc: IdocSchema) => {
  const { email, role } = user;
  const isUser = await User.findOne({ email });
  const isAdmin = role === "admin";
  const hasReadAccess = hasDocReadAccess(doc, email);
  const hasDepartmentAccess = hasDepartmentAcces(doc, isUser?.department.name);
  
  return isAdmin || hasReadAccess || hasDepartmentAccess;
};





