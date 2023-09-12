import { v2 as cloudinary } from "cloudinary";
import streamify from "streamifier";

export const streamUploadFile = async (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const cloud_upload_stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
      },
      function (err, result) {
        if (err) reject(`Error ${err}`);
        resolve(result);
      },
    );

    streamify.createReadStream(buffer).pipe(cloud_upload_stream);
  });
};
