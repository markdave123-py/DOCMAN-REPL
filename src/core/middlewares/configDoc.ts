import multer from "multer";
import * as cloudinary from "cloudinary";
import { config } from "../config/env";

export const configUpload = () => {
  cloudinary.v2.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  });

  const storage = multer.memoryStorage(); // Store files in memory

  const upload = multer({ storage });

  return upload;
};
