import { IDepartment } from "./department.interface";

export interface TokenUser {
  email: string;
  role: string;
  department: IDepartment
}