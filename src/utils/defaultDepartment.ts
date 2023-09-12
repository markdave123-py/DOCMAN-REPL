import { Department } from "../models/department";
import { config } from "../config/env";


export const createDefaultDepartment = async () =>{

    const allDepartment = await Department.countDocuments();

    if ( allDepartment === 0){

        const newDepartemnt = await Department.create({
            name: config.DEFAULT_DEPARTMENT
        })


        return newDepartemnt


    }
}