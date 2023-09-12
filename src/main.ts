// src/app.ts
import express, { Request, Response } from "express";
import { connectToDatabase } from "./config/database";
import { config } from "./config/env";
import { addAdminToDb } from "./utils/addSuperAdmin";
import { router } from "./routes/userRoute";
import { verifyJwt } from "./middlewares/verifyToken";
import { adminRouter } from "./routes/admin.route";
import { docRoute } from "./routes/docRoute";
import { inviteRoute } from "./routes/acceptInvite.route";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/", router);

app.use("/", inviteRoute);

app.use(verifyJwt);

app.use("/", adminRouter);

app.use("/", docRoute);

app.use(errorHandler);

connectToDatabase().then(() => {
  // Start the server after successful database connection
  console.log(`sucessfully connected to the database ${config.mongoUrl}`);
  app.listen(config.port, async () => {
    await addAdminToDb();
    console.log(`Server is running on http://localhost:${config.port} `);
  });
});
