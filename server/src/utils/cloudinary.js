import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary= async(localFilePath,folder,quality=10) => {
    try {
        const options = {folder,resource_type:"auto",quality}
        if(!localFilePath)return null;
        const response = await cloudinary.uploader.upload(localFilePath,options);
        console.log("file is uploaded successfully");
        fs.unlinkSync(localFilePath);
        return response.url;

    } catch (error) {
        console.error(error.message);
        console.log('file upload failed!');
        fs.unlinkSync(localFilePath);
        return "";
    }
}

export {uploadOnCloudinary}
        