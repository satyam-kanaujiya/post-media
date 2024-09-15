import React, { useEffect, useState } from 'react';
import ads from '../assets/ads.png'
import Online from './Online';
import Friends from './Friends';
import axios from 'axios';
import { IoMdAdd,IoMdRemove } from "react-icons/io";
import { useAuthContext } from '../context/AuthContext';
import noProfile from '../assets/noProfile.jpg';

function Rightbar({user}) {
 
  const HomeRightbar = () =>{
    const {user:currentUser} = useAuthContext();
    const [friends,setFriends] = useState([]);
    useEffect(()=>{
      const getFriends = async() =>{
        try {
          const friendList = await axios.get(`http://127.0.0.1:8080/api/v1/users/friends/${currentUser?._id}`);
          setFriends(friendList.data.friends);
          // console.log(friendList.data.friends);
        } catch (error) {
          console.log(error.message);
        }
      };
      getFriends();
    },[currentUser]);
    return (
      <div className="w-full">
        <div className='w-full'>
          <div className='flex items-center'>
            <img src={noProfile} alt="" className='w-10 h-10 mr-3 object-cover aspect-square' />
            <span className='font-light text-[15px]'><b>alexander pete</b> and <b>3 other friends</b> have a birthday today</span>
          </div>
          <img src={ads} alt="" className='w-full rounded-[10px] mx-0 my-[30px]'/>
          <h4 className='mb-5 text-lg font-medium'>Online Friends</h4>
          <ul className='p-0 m-0 [list-style:none]'>
            {friends.map(friend=><Online key={friend._id} friend={friend}/>)}
          </ul>
        </div>
      </div>
    )
  };

  const ProfileRightbar = () => {
    const {user:currentUser,dispatch} = useAuthContext();
    // console.log(currentUser);
    const [friends,setFriends] = useState([]);
    const [followed, setFollowed] = useState(false);

    const handleFollow = async() =>{
      try {
        if(followed)
        {
          const res = await axios.put(`http://127.0.0.1:8080/api/v1/users/unfollow/${user?._id}`,{
             userId:currentUser._id
          });
          console.log("unfollow: ",res.data.followingUpdatedUser);
          dispatch({type:"LOGIN SUCCESS",payload:res.data.followingUpdatedUser});

        }
        else{
          const res = await axios.put(`http://127.0.0.1:8080/api/v1/users/follow/${user?._id}`,{
            userId:currentUser._id
         });
         console.log("Follow: ",res.data.followingUpdatedUser);
         dispatch({type:"LOGIN SUCCESS",payload:res.data.followingUpdatedUser});
        }
        
      } catch (error) {
        console.log(error.message);
      }
      setFollowed(!followed);
    }
    useEffect(()=>{
      setFollowed(currentUser.following?.includes(user?._id));
    },[])
    useEffect(()=>{
      if(user?._id){
        const getFriends = async() =>{
          try {
            const friendList = await axios.get(`http://127.0.0.1:8080/api/v1/users/friends/${user?._id}`);
            setFriends(friendList.data.friends);
          } catch (error) {
            console.log(error.message);
          }
        };
        getFriends();
      }
      
    },[user])
    return (
      <>
        {
           user.username !==currentUser.username && (
            <button onClick={handleFollow} className='bg-green-700 text-white flex items-center gap-2 mt-8 mb-3 border-none px-2 py-1 text-lg rounded-md focus:outline-none'>
              {followed?<span>Unfollow</span>:<span>Follow</span>}
              {followed?<span><IoMdRemove/></span>:<span><IoMdAdd/></span>}
            </button>
           )
        }
        <h4 className="text-[18px] font-medium mb-[10px]">User information</h4>
        <div className="mb-[30px]">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="text-[18px] font-medium mb-[10px]">User friends</h4>
        <div className="flex flex-wrap justify-around">
          {friends.map((u)=><Friends key={u._id} friend={u}/>)}
        </div>
      </>
    );
  };
  return(
      <div className="w-[30%]">
        <div className="pt-[20px] pr-[20px] pb-[0] pl-[0]">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div> 
    );
}

export default Rightbar