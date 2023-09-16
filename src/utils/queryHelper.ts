import { User } from "../models/user";


export const isAdmin =  async (email: string) =>{

    const user = await User.findOne({email: email})

    return user?.role == "admin"
}