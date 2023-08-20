import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
    return bcrypt.hash(password,10)
}


export const comparePassword = (hashedPassword: string, userPassword: string) =>{
    return bcrypt.compare(hashedPassword, userPassword)

}