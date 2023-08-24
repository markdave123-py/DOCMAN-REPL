import dotenv from "dotenv"

dotenv.config()



export const config = Object.freeze(
    {
    port : process.env.PORT,
    mongoUrl: process.env.MONGO_URL as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    DOCMAN_API_KEY: process.env.DOCMAN_API_KEY as string,

    super_admin: {
        firstName: process.env.SUPER_ADMIN_FIRSTNAME,
        lastName: process.env.SUPER_ADMIN_LASTNAME,
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        phoneNumber: process.env.SUPER_ADMIN_PHONENUMBER
    },
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string ,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string

    
    
}
)