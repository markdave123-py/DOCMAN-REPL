import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
    
  } catch (error) {
    throw new Error(error);
  }
};

export const  comparePassword = async (
  hashedPassword: string,
  userPassword: string,
) => {
  return await bcrypt.compare(hashedPassword, userPassword);
};
