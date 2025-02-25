import { IoNotifications, IoPerson, IoSearch } from "react-icons/io5";
import { MdChat } from "react-icons/md";
import noUserImg from '../assets/noProfile.jpg';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

function Navbar({username,handleTimelineSuccess}) {
    const {user,dispatch} = useAuthContext();
    const handleLogout = () =>{
        {dispatch({type:"LOGIN FAIL",payload:null});}
    }
  return (
    <div className="h-12 z-10 w-full bg-blue-500 flex items-center sticky top-0">
        <div className="w-[25%] flex items-center">
            {/* <Link to="/" > */}
                <span className="ml-4 text-[24px]  font-bold text-[white] cursor-pointer" onClick={()=>handleTimelineSuccess(false)}>SocialMedia</span>
            {/* </Link> */}
        </div>
        <div className="w-[40%]">
            <div className="w-full h-7 bg-white rounded-3xl gap-3 flex items-center">
                <IoSearch className="ml-4"/>
                <input type="text" placeholder="Search post or people" className="w-[70%] focus:outline-none" />
             </div>
        </div>
        <div className="w-[35%] flex gap-4 items-center justify-between text-white">
            <div className="ml-4 gap-3 flex">
                {  username && 
                    <Link to="/">
                        <span className="cursor-pointer">Homepage</span>
                    </Link>
                }
                {!username && <button className="cursor-pointer" onClick={()=>handleTimelineSuccess(true)}>All Post</button>}
            </div>
            <button onClick={handleLogout}>Logout</button>
            <div className="flex justify-evenly gap-4 ">
                <div className="relative flex cursor-pointer">
                    <IoPerson/>
                    <span className="absolute -top-3 -right-2 bg-red-700 rounded-[50%] text-sm text-center w-4 h-4">1</span>
                </div>
                <div className="relative flex cursor-pointer">
                    <MdChat/>
                    <span className="absolute -top-3 -right-2 bg-red-700 rounded-[50%] text-sm text-center w-4 h-4">1</span>
                </div>
                <div className="relative flex cursor-pointer">
                    <IoNotifications/>
                    <span className="absolute -top-3 -right-2 bg-red-700 rounded-[50%] text-sm text-center w-4 h-4">1</span>
                </div>
            </div>
            <div>
                { 
                !username &&
                <Link to={`/profile/${user.username}`}>
                    <img src={(user?.profilePicture)||noUserImg} alt="person 1" className="mr-8 h-8 w-8 aspect-[1/1] object-cover rounded-[50%]" />
                    </Link>
                }
            </div>
            
        </div>
    </div>
  )
}

export default Navbar