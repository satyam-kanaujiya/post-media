import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
import customError from "./src/middlewares/customError.middleware.js";
import helmet from "helmet";
import userRouter from "./src/routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const morganFormat = ":method :url :status :response-time ms";
const app = express();

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

app.use(cors({
    origin:process.env.CORS_ORIGIN
}));

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/v1/users",userRouter);
app.use(customError);

export default app;

