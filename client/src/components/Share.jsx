import React, { useRef, useState } from 'react'
import { MdPermMedia, MdLocationOn, MdEmojiEmotions,MdCancel   } from "react-icons/md";
import { BsTagFill } from "react-icons/bs";
import { useAuthContext } from '../context/AuthContext';
import noUserImg from '../assets/noProfile.jpg';
import axios from 'axios';
import {toast} from 'react-hot-toast';

function Share() {
    const desc = useRef();
    const {user} = useAuthContext();
    const [postFile,setPostFile] = useState(null);
    const handleShareForm = async(e) =>{
        e.preventDefault();
        const data = new FormData();
        const newPost = {
            postedBy:user?._id,
            desc:desc.current.value
        }
        if(postFile)
        {
            data.append('postFile',postFile);
            data.append('postedBy',newPost.postedBy);
            data.append('desc',newPost.desc);
        }
        try {
            const res = await axios.post(`http://127.0.0.1:8080/api/v1/users/posts/create`,data,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

            console.log('printing response',res.data);

            if(!res.data.success)
            {
               toast.error(res.data.message);
            }
            desc.current.value = "";
            setPostFile(null);
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
       
    }
  return (
    <div className='w-full rounded-[10px] [box-shadow:0px_0px_16px_-8px_rgba(0,_0,_0,_0.68)]'>
        <div className='p-[10px]'>
            <div className='flex items-center'>
                <img className='w-[50px] h-[50px] rounded-[50%] object-cover mr-[10px]' src={user?.profilePicture || noUserImg} alt="person" />
                <input type="text" ref={desc} placeholder={`Share your thought ${user?.username}`} className='border-[none] w-4/5 focus:outline-none' />
            </div>
            <hr className='m-[20px]'/>
            {postFile && (
                <div className='relative mb-5'>
                    <img src={URL.createObjectURL(postFile)} alt="" className='w-full h-[300px] object-contain'/>
                    <MdCancel  className='absolute top-3 right-3 text-2xl cursor-pointer font-extrabold' onClick={()=>setPostFile(null)}/>
                </div>
            )}
            <form onSubmit={handleShareForm} className='flex items-center justify-between w-full'>
                <div className='flex ml-[20px]'>
                    <div className='flex mr-[15px] items-center'>
                        <MdPermMedia color='red' className='share-icon'/>
                        <label htmlFor='imgInput' className='share-text cursor-pointer'>Photo or Video</label>
                        <input style={{display:"none"}} type='file' name='postFile' id='imgInput' accept='.png, .jpeg, .jpg' onChange={(e)=>setPostFile(e.target.files[0])}/>
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
                <button type='submit' className='border-[none] p-[7px] rounded-[5px] bg-[green] font-medium mr-[20px] cursor-pointer text-[white]'>Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share