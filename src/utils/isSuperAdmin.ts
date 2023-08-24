import { config } from "../config/env";

export const isSuperAdmin = (email: string) =>{
    console.log(config.super_admin)
    return email === config.super_admin.email!
}