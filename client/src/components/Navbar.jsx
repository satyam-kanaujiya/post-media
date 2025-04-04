import { IoNotifications, IoPerson, IoSearch } from "react-icons/io5";
import { MdChat } from "react-icons/md";
import noUserImg from '../assets/noProfile.jpg';
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Navbar({username,handleTimelineSuccess,timeline}) {
    const {user,dispatch} = useAuthContext();
    const handleLogout = () =>{
        {dispatch({type:"LOGIN FAIL",payload:null});}
    }

  return (
    <div className="h-14 z-10 w-full bg-[#286028] flex items-center sticky top-0">
        <div className="w-[25%] flex items-center">
                <span className="ml-4 text-[24px]  font-bold text-[white] cursor-pointer" onClick={()=>handleTimelineSuccess && handleTimelineSuccess(false)}>PostMedia</span>
        </div>
        <div className="w-[50%]">
            <div className="w-full h-7 bg-white rounded-3xl gap-3 flex items-center">
                <IoSearch className="ml-4"/>
                <input type="text" placeholder="Search post or people" className="w-[70%] focus:outline-none" />
             </div>
        </div>
        <div className="w-[25%] flex gap-4 items-center justify-between text-white">
            <div className="ml-10 gap-3 flex">
                {  username && 
                    <Link to="/">
                        <span className="cursor-pointer">Homepage</span>
                    </Link>
                }
                {!username && <button className="cursor-pointer" onClick={()=>handleTimelineSuccess(!timeline)}>{timeline?"My Page":"All Post"}</button>}
            </div>
            <button onClick={handleLogout}>Logout</button>
            <div>
                { 
                !username &&
                <Link to={`/profile/${user.username}`}>
                    <img src={(user?.profilePicture)||noUserImg} alt="person 1" className="mr-10 h-8 w-8 aspect-[1/1] object-cover rounded-[50%]" />
                    </Link>
                }
            </div>
            
        </div>
    </div>
  )
}

export default Navbar