import dotenv from 'dotenv';
dotenv.config({path:"./.env"});
import app from "./app.js";
import dbConnect from "./src/database/dbConnect.js";

const PORT = process.env.PORT;

dbConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    })
})
.catch((err)=>{
    console.log("server cannot listen");
});