import { IDepartment } from "../interface/department.interface";
import {Schema, model} from 'mongoose';


export const departmentSchema = new Schema<IDepartment>({
    name: String,
    createdAt: Date.now(),
    updatedAt: Date.now()

})


export const DepartmentModel = model<IDepartment>('Department', departmentSchema);