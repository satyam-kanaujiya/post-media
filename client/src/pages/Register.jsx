import React,{useRef} from 'react';
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
import api from '../utils/api';

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
          const res = await api.post(`/users/register`,user);
          toast.success("Account created, please login")
          setTimeout(()=>{
            navigate("/login");
          },2000); 
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
<div className="w-screen h-screen bg-[#f0f2f5] flex flex-col items-center p-3">
    {/* Header Section */}
    <div className="flex flex-col items-center mt-3 text-center px-3">
        <h3 className="text-[24px] md:text-[32px] font-extrabold text-[#1775ee]">PostMedia</h3>
        <span className="text-sm md:text-base">
            Connect with friends and the world around you on PostMedia.
        </span>
    </div>

    {/* Form Container */}
    <div className="w-full max-w-[350px] flex flex-col items-center mt-3">
        <div className="w-full flex flex-col">
            <form 
                onSubmit={handleForm} 
                className="p-3 bg-white rounded-[8px] flex flex-col gap-2 shadow-md w-full"
            >
                <input placeholder="Username" required ref={username} className="h-[40px] w-full rounded-[8px] border border-gray-300 text-[12px] md:text-[14px] pl-3 focus:outline-none" />
                <input placeholder="Email" required ref={email} className="h-[40px] w-full rounded-[8px] border border-gray-300 text-[12px] md:text-[14px] pl-3 focus:outline-none" />
                <input placeholder="Password" required type='password' ref={password} className="h-[40px] w-full rounded-[8px] border border-gray-300 text-[12px] md:text-[14px] pl-3 focus:outline-none" />
                <input placeholder="Password Again" required type='password' ref={passwordAgain} className="h-[40px] w-full rounded-[8px] border border-gray-300 text-[12px] md:text-[14px] pl-3 focus:outline-none" />
                <input placeholder="City" ref={city} className="h-[40px] w-full rounded-[8px] border border-gray-300 text-[12px] md:text-[14px] pl-3 focus:outline-none" />
                <input placeholder="From" ref={from} className="h-[40px] w-full rounded-[8px] border border-gray-300 text-[12px] md:text-[14px] pl-3 focus:outline-none" />
                <input placeholder="Relationship" ref={relationship} className="h-[40px] w-full rounded-[8px] border border-gray-300 text-[12px] md:text-[14px] pl-3 focus:outline-none" />
                <input placeholder="Desc" ref={desc} className="h-[40px] w-full rounded-[8px] border border-gray-300 text-[12px] md:text-[14px] pl-3 focus:outline-none" />

                {/* Buttons */}
                <button type='submit' className="h-[40px] w-full rounded-[8px] bg-[#1775ee] text-white text-[14px] md:text-[16px] font-medium cursor-pointer">Sign Up</button>
                <button onClick={handleLoginButton} className="w-full md:w-3/5 self-center h-[40px] rounded-[8px] bg-[#42b72a] text-white text-[14px] md:text-[16px] font-medium cursor-pointer">
                    Log into Account
                </button>
            </form>
        </div>
    </div>
</div>






  )
}

export default Register