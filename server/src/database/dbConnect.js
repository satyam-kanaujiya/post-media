import mongoose from "mongoose";
import { dbName } from "../../constant.js";

const dbConnect = async() =>{
    try {
        const response = await mongoose.connect(`${process.env.DB_URI}`);    
    } catch (error) {
        process.exit(1);
    }
}

export default dbConnect;