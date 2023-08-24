// src/app.ts
import express, { Request, Response } from 'express';
import {connectToDatabase} from "./config/database"
import { config } from './config/env';
import { addAdminToDb } from './utils/addSuperAdmin';
import { router } from './routes/userRoute';
import { verifyJwt } from './middlewares/verifyToken';
import { uploadRouter } from './routes/uploadRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});


app.use('/', router);


app.use(verifyJwt);

app.use('/upload', uploadRouter);

// app.get('/testing', (req: Request, res: Response) => {
//   res.status(200).json({'message': 'done'});
// })


connectToDatabase()
  .then(() => {
  // Start the server after successful database connection
  console.log(`sucessfully connected to the database ${config.mongoUrl}`)
  app.listen(config.port, async () => {
    await addAdminToDb();
    console.log(`Server is running on http://localhost:${config.port}`);
  });
});