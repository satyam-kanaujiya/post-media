import React, { useRef, useState } from 'react'
import { MdPermMedia, MdLocationOn, MdEmojiEmotions,MdCancel   } from "react-icons/md";
import { BsTagFill } from "react-icons/bs";
import { useAuthContext } from '../context/AuthContext';
import noUserImg from '../assets/noProfile.jpg';
import {toast} from 'react-hot-toast';
import uploadToCloudinary from '../utils/cloudinary';
import api from '../utils/api';

function Share() {
    const {user} = useAuthContext();
    const [desc,setDesc] = useState("");
    const [postUrl,setPostUrl] = useState("");
    const [postedBy,setPostedBy] = useState(user?._id);
    const [uploading, setUploading] = useState(false);

    const handlePostChange = async(e) =>{
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const url = await uploadToCloudinary(file, "image","postmedia/posts");
        setUploading(false);
        setPostUrl(url);
    };

    const handleShareForm = async(e) =>{
        e.preventDefault();
        if(!desc || !postUrl || !postedBy){
            toast.error("Please write description and upload post")
            return;
        }
        const data = {
            postUrl,
            desc,
            postedBy
        };
        try {
            const res = await api.post(`/users/posts/create`,data);
            if(!res.data.success)
            {
               toast.error(res.data.message);
            }
            if(res.data.success)
            {
                toast.success(res.data.message);
                setPostUrl("");
                setDesc("");
            }
        } catch (error) {
            toast.error(error.message);
        }
       
    }
  return (
    <div className='w-full rounded-[10px] [box-shadow:0px_0px_16px_-8px_rgba(0,_0,_0,_0.68)]'>
        <div className='p-[10px]'>
            <div className='flex items-center'>
                <img className='w-[50px] h-[50px] rounded-[50%] object-cover mr-[10px]' src={user?.profilePicture || noUserImg} alt="person" />
                <input type="text" value={desc} onChange={e=>setDesc(e.target.value)} placeholder={`Share your thought ${user?.username}`} className='border-[none] w-4/5 focus:outline-none' />
            </div>
            <hr className='m-[20px]'/>
            {postUrl && (
                <div className='relative mb-5'>
                    <img src={postUrl} alt="" className='w-full h-[300px] object-contain'/>
                    <MdCancel  className='absolute top-[-10px] right-3 text-2xl cursor-pointer font-extrabold' onClick={()=>setPostUrl("")}/>
                </div>
            )}
            <form onSubmit={handleShareForm} className='flex items-center justify-between w-full'>
                <div className='flex ml-[20px]'>
                    <div className='flex mr-[15px] items-center'>
                        <MdPermMedia color='red' className='share-icon'/>
                        <label htmlFor='imgInput' className='share-text cursor-pointer'>Photo or Video</label>
                        <input style={{display:"none"}} id="imgInput" type='file' accept="image/*" onChange={e=>handlePostChange(e)}/>
                    </div>
                    <div className='share-option'>
                        <BsTagFill color='green' className='share-icon'/>
                        <span className='share-text'>Tag</span>
                    </div>
                    <div className='share-option'>
                        <MdLocationOn color='blue' className='share-icon'/>
                        <span className='share-text'>Location</span>
                    </div>
                    <div className='share-option'>
                        <MdEmojiEmotions color='yellowgreen' className='share-icon'/>
                        <span className='share-text'>Feelings</span>
                    </div>
                </div>
                <button type='submit' disabled={!postUrl} className='border-[none] p-[7px] rounded-[5px] bg-[green] font-medium mr-[20px] cursor-pointer text-[white]'>{uploading?"Wait":"Share"}</button>
            </form>
        </div>
    </div>
  )
}

export default Share