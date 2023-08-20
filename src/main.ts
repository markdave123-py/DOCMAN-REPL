// src/app.ts
import express, { Request, Response } from 'express';
import {connectToDatabase} from "./config/database"
import { config } from './config/env';
import { addAdminToDb, savedSuperAdmin1 } from './utils/addSuperAdmin';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Connect to the database
connectToDatabase()
  .then(() => {
  // Start the server after successful database connection
  console.log(`sucessfully connected to the database ${config.mongoUrl}`)
  app.listen(config.port, () => {
    addAdminToDb();
    console.log(`Server is running on http://localhost:${config.port}`, savedSuperAdmin1);
  });
});