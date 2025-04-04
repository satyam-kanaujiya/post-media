import React, { useState,useEffect } from 'react'
import { MdOutlineMoreVert } from "react-icons/md";
import heart from '../assets/heart.png'
import likeImg from '../assets/like.png'
import noUserImg from '../assets/noProfile.jpg';
import {format} from 'timeago.js';
import {Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import api from '../utils/api';

function Post({post,username}) {
    // console.log("printing post ",post)
    const {user:currentUser} = useAuthContext();
    // console.log(currentUser);
    const [user,setUser] = useState({});

    const [like,setLike] = useState(post.likes.length);
    const [isLike,setIsLike] = useState(false);

    const handleLike = async() =>{
        try {
            await api.put(`/users/posts/likes/${post?._id}`,{likedBy:currentUser?._id});
        } catch (error) {
            console.log("fetching like failed!")
        }
        setLike(isLike?like-1:like+1);
        setIsLike(!isLike);
    }

    useEffect(()=>{
        setIsLike(post.likes.includes(currentUser?._id));
    },[currentUser?.id,post.likes])

    useEffect(()=>{
        const fetchUser = async() =>{
          try {
            const res = await api.get(`/users?id=${post.postedBy}`);
            setUser(res.data.user);
          } catch (error) {
            console.log("error while fetching the data");
          }
        }
        fetchUser();
    },[post.postedBy])

  return (
    <div className='w-full rounded-[10px] [box-shadow:0px_0px_16px_-8px_rgba(0,_0,_0,_0.68)] mx-[0] my-[30px]'>
        <div className='p-[10px]'> 
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    {
                        username
                        ?<img src={user.profilePicture|| noUserImg} alt="" className='w-[32px] h-[32px] rounded-[50%] object-cover' />
                        :<Link to={`profile/${user.username}`}>
                            <img src={user.profilePicture|| noUserImg} alt="" className='w-[32px] h-[32px] rounded-[50%] object-cover' />
                        </Link>
                    }
                    <span className='text-[15px] font-medium mx-[10px] my-[0]'>{ user.username || "anonymous"}</span>
                    <span className='text-[12px]'>{format(post.createdAt)||"1 min ago"}</span>
                </div>
                <div >
                    <MdOutlineMoreVert/>
                </div>
            </div>
            <div className='mx-[0] my-[20px]'>
                <span>{post?.desc}</span>
                <img src={post?.img} alt="No photo" className='mt-[20px] w-full h-[300px] object-cover'/>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                     <img src={heart} alt="" className='w-[24px] h-[24px] mr-[5px] cursor-pointer' onClick={handleLike}/>
                     <img src={likeImg} alt="" className='w-[24px] h-[24px] mr-[5px] cursor-pointer' onClick={handleLike}/>
                     <span className='text-[15px]'>{like} people liked it</span>
                </div>
                <div>
                    <span className='cursor-pointer border-b-[1px_dashed_gray] text-[15px]'>{"No comment " || post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post