import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password,10)
}


export const comparePassword = (hashedPassword: string, userPassword: string) =>{
    return bcrypt.compare(hashedPassword, userPassword)

}