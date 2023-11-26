// src/app.ts

import express, { Request, Response } from 'express';
import {connectToDatabase} from "./core/config/database"
import { config } from './core/config/env';
import { addAdminToDb, defaultCategory } from './core/utils/addSuperAdmin';
import { router } from './routes/userRoute';
import { verifyJwt } from './auth/services/current.user';
import { adminRouter } from './routes/admin.route';
import { docRoute } from './docs/routes/docRoute';
import { createDefaultDepartment } from './core/utils/defaultDepartment';
import { departmentRouter } from './routes/departmentRoute';
import { inviteRoute } from './routes/acceptInvite.route';
import cors from 'cors'
import cookie from 'cookie-parser';





const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/", router);

app.use("/", inviteRoute);
app.use("/", departmentRouter);

app.use(verifyJwt);

app.use("/", adminRouter);

app.use('/', docRoute);



// app.get('/testing', (req: Request, res: Response) => {
//   res.status(200).json({'message': 'done'});
// })


connectToDatabase()
  .then(() => {
  // Start the server after successful database connection
  console.log(`sucessfully connected to the database ${config.mongoUrl}`);
  app.listen(config.port, async () => {
    await defaultCategory();
    await createDefaultDepartment();
    await addAdminToDb();
    
    
    
    console.log(`Server is running on http://localhost:${config.port} `);
  });
});
