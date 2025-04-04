import React from 'react'
import noUserImg from '../assets/noProfile.jpg';
import { Link } from 'react-router-dom';

function Friends({friend}) {
  return (
    <Link to={`/profile/${friend.username}`}>
      <div className="flex flex-col mb-[20px] cursor-pointer">
          <img
              src={friend.profilePicture || noUserImg}
              alt="friends"
              className="w-[100px] h-[100px] object-cover rounded-[5px]"
          />
          <span className="text-center">{friend.username || "anonymous"}</span>
      </div>
    </Link>
  )
}

export default Friends