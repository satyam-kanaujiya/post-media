import {ApiError} from "../utils/ApiError.js";
import mongoose from "mongoose";

const customError = (err,req,res,next) =>{
    if(err instanceof ApiError)
    {
       return res.status(err.statusCode).json({
            message:err.message,
            success:err.success
        });
    }
    console.log(err);
   return res.status(500).json({message:"something went wrong",success:false,error:err})
}

export default customError;

