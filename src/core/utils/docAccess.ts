import { IDepartment } from "../../interface/department.interface";
import { IdocSchema } from "../../interface/doc.interface";
import { TokenUser } from "../../interface/token.user.interface";
import { User } from "../../models/user";

export const returnArray = (arr: string[]): string[] =>{
  return Array.isArray(arr)
      ? arr
      : []
}

export const hasDocReadAccess = (doc: IdocSchema, email: string, department: IDepartment): boolean => {
  return (doc?.metaData?.readAccess?.includes(email) || doc?.metaData?.departmentReadAccess?.includes(department.name)) ?? false;
};

export const hasDocWriteAccess = (doc: IdocSchema, email: string,  department: IDepartment): boolean => {
  return  (doc?.metaData?.writeAccess?.includes(email) || doc?.metaData?.departmentWriteAccess?.includes(department.name)) ?? false;
};

export const hasDocDeleteAccess = (doc: IdocSchema, email: string,  department: IDepartment): boolean => {
  return  (doc?.metaData?.deleteAccess?.includes(email) || doc?.metaData?.departmentDeleteAccess?.includes(department.name)) ?? false;;
};

export const isForbidden = (doc: IdocSchema, email: string,  department: IDepartment): boolean => {
  
  return  (doc?.metaData?.forbiddenUsers?.includes(email) || doc?.metaData?.forbiddenDepartments?.includes(department.name)) ?? false;;
}

export const isAdminOrHasAccess =  (user: TokenUser, doc: IdocSchema) => {
  const { email, role, department } = user;
  const isAdmin = role === "admin";
  const hasReadAccess = hasDocReadAccess(doc, email, department);
  const hasWriteAccess = hasDocWriteAccess(doc, email, department);
  // const hasDepartmentAccess = hasDepartmentAcces(doc, isUser?.department.name);

  if (isForbidden(doc, email, department)) return false
  
  return isAdmin || hasReadAccess || hasWriteAccess ;
};


export const getAccessibleDocuments = 



(user: TokenUser) => {
  const { email, role, department } = user;
  const isAdmin = role === "admin";
  
    // Regular users can access documents they have access to
    const query = isAdmin 
    ? {} :
     {
      $or: [
        {
          $and: [
            { "metaData.readAccess": email },
            { "metaData.forbiddenUsers": { $nin: [email] } }
          ]
        },
        {
          $and: [
            { "metaData.departmentReadAccess": department.name },
            { "metaData.forbiddenDepartments": { $nin: [department.name] } }
          ]
        },
        {
          $and: [
            { "metaData.writeAccess": email },
            { "metaData.forbiddenUsers": { $nin: [email] } }
          ]
        },
        {
          $and: [
            { "metaData.departmentWriteAccess": department.name },
            { "metaData.forbiddenDepartments": { $nin: [department.name] } }
          ]
        }
      ]
    };
    
    return query;
  
};




