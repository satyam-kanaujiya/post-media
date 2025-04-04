import React from 'react'
import noUserImg from '../assets/noProfile.jpg';
function Online({friend}) {
  return (
    <li className='flex items-center mb-4'>
        <div className='mr-2 relative'>
            <img src={friend?.profilePicture || noUserImg} alt="" className='h-10 w-10 rounded-[50%] object-cover' />
            <span className='h-3 w-3 rounded-[50%] bg-lime-600 absolute -top-[2px] right-0 border-2 border-white'></span>
        </div>
        <span>{friend?.username || "anonymous"}</span>
    </li>
  )
}

export default Online