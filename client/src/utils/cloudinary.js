import axios from 'axios';
const uploadToCloudinary = async (file,resourceType,folderPath) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `${folderPath}`);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        formData
      );
      return response.data.secure_url; 
    } catch (error) {
      console.error("Upload error:", error);
      return "";
    }
  };

  export default uploadToCloudinary;