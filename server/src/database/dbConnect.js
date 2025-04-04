import mongoose from "mongoose";
import { dbName } from "../../constant.js";

const dbConnect = async() =>{
    try {
        const response = await mongoose.connect(`${process.env.DB_URI}`);    
        console.log("hostname: ",response.connection.host);
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}

export default dbConnect;