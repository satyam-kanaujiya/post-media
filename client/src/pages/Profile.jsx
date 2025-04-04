import Content from "../components/Content"
import Leftbar from "../components/Leftbar"
import Navbar from "../components/Navbar"
import Rightbar from "../components/Rightbar"
import bg from "../assets/bg1.jpg";
import noProfile from "../assets/noProfile.jpg"
import { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import api from "../utils/api";

function Profile() {
  const {user:currentUser} = useAuthContext();
  const params = useParams();
  const {username} = params;
  // console.log(username);
  const [user,setUser] = useState({});
  useEffect(()=>{
    const fetchUser = async() =>{
      try {
        const res = await api.get(`/users?username=${username}`);
        // console.log("printing res.data ->",res.data);
        setUser(res.data.user);
      } catch (error) {
        console.log("error while fetching the data");
      }
    }
    fetchUser();
  },[username]);

  return (
    <>
      <Navbar username={username} />
      <div className="flex w-full">
        <Leftbar />
        <div className="w-[75%]">
          <div className="profileRightTop">
            <div className="h-[320px] relative">
              <img
                className="w-full h-[250px] object-cover"
                src={bg}
                alt=""
              />
              <img
                className="w-[150px] h-[150px] rounded-[50%] object-cover absolute left-[0] right-[0] m-auto top-[150px] border-[3px] border-[solid] border-[white]"
                src={user?.profilePicture || noProfile}
                alt=""
              />
              {
                (currentUser.username === username) && 
                (
                  <Link to={`/update/${user?._id}`}>
                    <button className="absolute bottom-1 left-[55%]">update</button>
                  </Link>
                )
              }
            </div>
            <div className="flex flex-col items-center justify-center">
                <h4 className="text-[24px]">{user?.username}</h4>
                <span className="font-light">{user?.desc}</span>
            </div>
          </div>
          <div className="flex">
            <Content username={username}/>
            <Rightbar user={user}/>
        </div>
      </div>
    </div>
    
  </>
  )
}

export default Profile