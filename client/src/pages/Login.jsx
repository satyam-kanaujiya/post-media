import { useContext, useRef } from "react";
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";
import { useNavigate,Navigate } from "react-router-dom";
import {toast} from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();
    const {user,isFetching,error,dispatch} = useAuthContext();
    const loginCall = async(userCredential,dispatch) =>{
      dispatch({type:"LOGIN START"});
      try {
        const res = await axios.post(`http://127.0.0.1:8080/api/v1/users/login`,userCredential);
        dispatch({type:"LOGIN SUCCESS",payload:res.data.data});
      } catch (error) {
        dispatch({type:"LOGIN FAIL",payload:error});
        toast.error(error.response.data.message);
        // console.log(error.response.data.message);
      }
  }
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const handleForm =(e) =>{
    e.preventDefault();
    if([email.current.value,password.current.value,username.current.value].some(field=>field.trim()===""))
    {
      return;
    }
     loginCall({email:email.current.value.trim(),password:password.current.value.trim(),username:username.current.value.trim()},dispatch);
};

const handleRegister = () =>{
    navigate("/register");
}


  return ( 
    <>
    {user && <Navigate to='/' replace={true}></Navigate>}
    <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center">
      <div className="w-[70%] h-[70%] flex">
        <div className="flex-[1] flex flex-col justify-center">
          <h3 className="text-[50px] font-extrabold text-[#1775ee] mb-[10px]">SocialMedia</h3>
          <span className="text-[24px]">
            Connect with friends and the world around you on SocialMedia.
          </span>
        </div>
        <div className="flex-[1] flex flex-col justify-center">
          <form onSubmit={handleForm} className="h-[400px] p-[20px] bg-[white] rounded-[10px] flex flex-col justify-between">
            <input placeholder="Username" required type="text" ref={username} className="h-[50px] rounded-[10px] border-[1px] border-[solid] border-[gray] text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="Email" required type="email" ref={email} className="h-[50px] rounded-[10px] border-[1px] border-[solid] border-[gray] text-[18px] pl-[20px] focus:outline-[none]" />
            <input placeholder="Password" autoComplete="true" required minLength={6} type="password" ref={password} className="h-[50px] rounded-[10px] border-[1px] border-[solid] border-[gray] text-[18px] pl-[20px] focus:outline-[none]" />
            <button type="submit" disabled={isFetching} className="h-[50px] rounded-[10px] border-[none] bg-[#1775ee] text-[white] text-[20px] font-medium cursor-pointer">{isFetching?"loading":"Log In"}</button>
            <span className="text-center text-[#1775ee]">Forgot Password?</span>
            <button onClick={handleRegister} className="w-3/5 self-center h-[50px] rounded-[10px] border-[none] bg-[#42b72a] text-[white] text-[20px] font-medium cursor-pointer">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}