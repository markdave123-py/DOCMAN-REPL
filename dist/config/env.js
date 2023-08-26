"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = Object.freeze({
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    DOCMAN_API_KEY: process.env.DOCMAN_API_KEY,
    super_admin: {
        firstName: process.env.SUPER_ADMIN_FIRSTNAME,
        lastName: process.env.SUPER_ADMIN_LASTNAME,
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        phoneNumber: process.env.SUPER_ADMIN_PHONENUMBER
    },
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
});
//# sourceMappingURL=env.js.map