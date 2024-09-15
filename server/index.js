import app from "./app.js";
import dotenv from 'dotenv';
import dbConnect from "./src/database/dbConnect.js";

dotenv.config();

const PORT = process.env.PORT;

dbConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    })
})
.catch((err)=>{
    console.log("server cannot listen");
})