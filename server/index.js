import dotenv from 'dotenv';
dotenv.config({path:"./.env"});
import app from "./app.js";
import dbConnect from "./src/database/dbConnect.js";

const PORT = process.env.PORT || 3000;

dbConnect()
.then(()=>{
    app.listen(PORT,()=>{});
})
.catch((err)=>{
    process.exit(1);
});