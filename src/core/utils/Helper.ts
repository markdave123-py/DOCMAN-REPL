import { User } from "../../models/user";


export const isAdmin =  async (email: string) =>{

    const user = await User.findOne({email: email})

    return user?.role == "admin"
}


export const sanitize = (user: any) => {
    const {password, _id, lastName, phoneNumber, createdAt, __v, ...rest} = user;
    return rest;
}
