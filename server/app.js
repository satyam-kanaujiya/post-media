import dotenv from 'dotenv';
dotenv.config({path:"./.env"});
import express from "express";
import customError from "./src/middlewares/customError.middleware.js";
import helmet from "helmet";
import userRouter from "./src/routes/user.route.js";
import cors from "cors";;

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN
}));

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/api/v1/users",userRouter);
app.use(customError);

export default app;