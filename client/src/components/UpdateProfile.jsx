import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, replace, useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import uploadToCloudinary from '../utils/cloudinary';
import api from '../utils/api';

const UpdateProfile = ({id}) => {
  const [profileUrl, setProfileUrl] = useState("");
  const {user,dispatch} = useAuthContext();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);


  // Handle file input change
  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadToCloudinary(file, "image","postmedia/profiles");
    setUploading(false);
    setProfileUrl(url);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        console.log("Printing profileUrl",profileUrl);
        const res = await api.put(`/users/${id}`, {profileUrl});
        if(!res.data.success)
        {
          toast.error(res.data.message);
        }
        if(res.data.success)
        {
          dispatch({type:"LOGIN SUCCESS",payload:res.data.data});
          toast.success(res.data.message);
          setTimeout(()=>navigate("/"),1000)
        }
      }catch (error) {
          toast.error(error.message);
          console.error('Error updating profile:', error);
      }
   };  

  return (
    <>
    <div className="w-full flex justify-center items-center mx-auto h-screen p-6 bg-gray-300 rounded-lg shadow-md">
        <div className='w-[40%] h-[50%] flex flex-col justify-evenly shadow-xl bg-white p-5' >
            <h1 className="text-2xl font-bold mb-4 text-center">Update Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4 ">
                <div className="flex flex-col">
                <label htmlFor="profile" className="text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 border border-gray-300 rounded-md"
                />
                </div>

                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                {uploading?"Wait":"Update Profile"}
                </button>
            </form>
      </div>
    </div>
    </>
  );
};

export default UpdateProfile;