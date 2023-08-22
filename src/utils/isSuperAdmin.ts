import { config } from "src/config/env";

export const isSuperAdmin = (email: string) =>{
    return email === config.super_admin.email
}