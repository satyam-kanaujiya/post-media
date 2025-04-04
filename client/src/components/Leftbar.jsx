import {useState,useEffect} from 'react';
import { MdOutlineFeed,MdGroup,MdEvent  } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { BsChatDots,BsFillPlayCircleFill,BsBookmarkFill,BsQuestionCircle,BsBriefcaseFill   } from "react-icons/bs";
import CloseFriend from "./CloseFriend";
import { useAuthContext } from "../context/AuthContext";
import api from '../utils/api';

function Leftbar() {
  const [friends,setFriends] = useState([]);
  const {user} = useAuthContext();
  useEffect(()=>{
    const getFriends = async() =>{
      try {
        const friendList = await api.get(`/users/friends/${user?._id}`);
        setFriends(friendList.data.friends);
        // console.log(friendList.data.friends);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFriends();
  },[user])


  const listStyle = "flex gap-3 items-center";
  return (
    <div className="w-[25%] h-[calc(100vh-48px)] overflow-y-scroll sticky top-12 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
      <div className="ml-4">
        <ul className="[list-style:none] flex flex-col mt-4 gap-4 font-bolder">
          <li className="li-style">
            <MdOutlineFeed className="li-icon"/>
            <span className="span-style">Feed</span>
          </li>
          <li className="li-style">
            <MdGroup className="li-icon"/>
            <span className="span-style">Groups</span>
          </li>
          <li className="li-style">
            <BsChatDots className="li-icon"/>
            <span className="span-style">Chats</span>
          </li>
          <li className="li-style">
            <BsFillPlayCircleFill className="li-icon" />
            <span className="span-style">Videos</span>
          </li>
          <li className="li-style">
            <BsBookmarkFill className="li-icon"/>
            <span className="span-style">Bookmark</span>
          </li>
          <li className="li-style">
            <BsQuestionCircle className="li-icon"/>
            <span className="span-style">Questions</span>
          </li>
          <li className="li-style">
            <MdEvent className="li-icon"/>
            <span className="span-style">Events</span>
          </li>
          <li className="li-style">
            <FaGraduationCap className="li-icon"/>
            <span className="span-style">Courses</span>
          </li>
          <li className="li-style">
             <BsBriefcaseFill className="li-icon" />
            <span className="span-style">Jobs</span>
          </li>
        </ul>
        <button className="w-[150px] border-[none] p-[10px] rounded-[5px] font-medium">Show More</button>
        <hr className="mx-[0] my-[20px]"/>
        <ul className="p-0 m-0 [list-style:none] flex flex-col gap-2">
           {friends.map((friend)=><CloseFriend key={friend._id} friend={friend}/>)}
        </ul>
      </div>
    </div>
  )
}

export default Leftbar