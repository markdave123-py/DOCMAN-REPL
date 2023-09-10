import { IDepartment } from "./department.interface";

export interface IUSER extends Document {
    firstName: string;
    lastName: string;
    email:  string;   
    phoneNumber: string;
    password: string;
    department: IDepartment

}