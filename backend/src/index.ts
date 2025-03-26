import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./lib/config/app.config";
import { db } from "./database/connectdb";
import { errorHandler } from "./middleware/errorHandler";
import { HTTPSTATUS } from "./lib/config/httpStatus";

const app = express();
const BASE_PATH = config.BASE_PATH;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({origin: config.APP_ORIGIN, credentials: true,})
);

app.get("/", (req: Request, res: Response) => {
res.status(HTTPSTATUS.OK).json({message:"Express Authentication"});
});

// To put error handler
app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`)
  await db.execute('select 1')
  .then(() => console.log("database successfully connected"))
  .catch(() => console.log("database could not successfully connect"))
})