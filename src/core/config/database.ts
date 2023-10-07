import mongoose from "mongoose";

import { config } from "./env";

// export const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(config.mongoUrl);
//     console.log('Connected to the database');
//   } catch (error:any) {
//     console.error('Error connecting to the database:', error.message);
//   }
// };

export const connectToDatabase = async () => {
  const func = () => {
    return config.mongoUrl;
  };
  console.log(func());
  await mongoose
    .connect(func())
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
};
