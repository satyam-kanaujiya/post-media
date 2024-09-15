import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, replace } from 'react-router-dom';

const UpdateProfile = ({id}) => {
  const [profile, setProfile] = useState(null);
  const {user} = useAuthContext;

  console.log("printing id",id);

  // Handle file input change
  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if(profile) {
      data.append('profile', profile);
    }
    // const id = "66d035da77661845932cd79f";
    console.log("printing id inside form submit",id);
            try {
                console.log(data);
                const response = await axios.put(`http://localhost:8080/api/v1/users/${id}`, data, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                console.log(response.data);
                setProfile(null);
              } 
            catch (error) {
                console.error('Error updating profile:', error);
            }
   };  

  return (
    <>
    {user && user.profilePicture!=="" && <Navigate to={`/profile/${user.username}`} replace={true}></Navigate>}
    <div className="w-full flex justify-center items-center mx-auto h-screen p-6 bg-gray-300 rounded-lg shadow-md">
        <div className='w-[40%] h-[50%] flex flex-col justify-evenly shadow-xl bg-white p-5' >
            <h1 className="text-2xl font-bold mb-4 text-center">Update Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4 ">
                <div className="flex flex-col">
                <label htmlFor="profile" className="text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                    type="file"
                    id="profile"
                    name="profile"
                    onChange={handleFileChange}
                    className="mt-1 border border-gray-300 rounded-md"
                />
                </div>

                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                Update Profile
                </button>
            </form>
      </div>
    </div>
    </>
  );
};

export default UpdateProfile;