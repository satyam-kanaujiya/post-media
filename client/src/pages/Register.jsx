import axios from 'axios';
import React,{useRef} from 'react';
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"

function Register() {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();
  const desc = useRef();
  const handleForm = async(e) =>{
    e.preventDefault();
    if(passwordAgain.current.value!==password.current.value)
    {
        passwordAgain.current.setCustomValidity("password don't match!");
    }else{
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
        city:city.current.value || "",
        from:from.current.value || "",
        relationship:relationship.current.value || "",
        desc:desc.current.value || "",
      }
      if([username.current.value,email.current.value,password.current.value].some((field)=>field.trim===""))
      {
         return;
      }
      else{
        try {
          console.log(user);
          const res = await axios.post(`http://127.0.0.1:8080/api/v1/users/register`,user);
          navigate("/login");
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
  }
  const handleLoginButton = (e) =>{
    e.preventDefault();
    navigate("/login");
  }
  return (
    <div className="w-screen h-screen bg-[#f0f2f5] flex flex-col items-center">
      <div className="flex flex-col justify-center mb-5">
          <h3 className="text-[40px] font-extrabold text-[#1775ee]">SocialMedia</h3>
          <span className="text-xl">
            Connect with friends and the world around you on SocialMedia.
          </span>
        </div>
      <div className="w-[40%] flex flex-col">
        
        <div className="flex-[1] flex flex-col justify-center">
          <form onSubmit={handleForm} className="h-[450px] p-[20px] bg-[white] rounded-[10px] flex flex-col justify-between ">
            <input placeholder="Username" ref={username} className="h-[50px] rounded-[10px] border-[1px] border-[solid] mb-2 border-[gray] text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="Email" ref={email} className="h-[50px] rounded-[10px] border-[1px] border-[solid] mb-2 border-[gray] text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="Password" type='password' ref={password} className="h-[50px] rounded-[10px] border-[1px] border-[solid] mb-2 border-[gray] text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="Password Again" type='password' ref={passwordAgain} className="h-[50px] rounded-[10px] border-[1px] mb-2 border-[solid] border-[gray] text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="City" ref={city} className="h-[50px] rounded-[10px] border-[1px] border-[solid] border-[gray] mb-2 text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="From" ref={from} className="h-[50px] rounded-[10px] border-[1px] border-[solid] border-[gray] mb-2 text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="Relationship" ref={relationship} className="h-[50px] rounded-[10px] border-[1px] border-[solid] mb-2 border-[gray] text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="Desc" ref={desc} className="h-[50px] rounded-[10px] border-[1px] border-[solid] border-[gray] mb-2 text-[18px] pl-[20px] focus:outline-[none]" />
            <button type='submit' className="h-[50px] rounded-[10px] border-[none] bg-[#1775ee] text-[white] mb-2 text-[20px] font-medium cursor-pointer">Sign Up</button>
            <button onClick={handleLoginButton} className="w-3/5 self-center h-[50px] rounded-[10px] border-[none] bg-[#42b72a] text-[white] text-[20px] font-medium cursor-pointer">
                 Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register