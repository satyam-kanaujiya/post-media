import { useContext, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate,Navigate } from "react-router-dom";
import {toast} from 'react-hot-toast';
import api from "../utils/api";

export default function Login() {
    const navigate = useNavigate();
    const {user,isFetching,error,dispatch} = useAuthContext();
    const loginCall = async(userCredential,dispatch) =>{
      dispatch({type:"LOGIN START"});
      try {
        const res = await api.post(`/users/login`,userCredential);
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
    <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center p-6">
    <div className="w-full max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[70%] h-auto md:h-[70%] flex flex-col md:flex-row items-center gap-6 md:gap-12">
        
        {/* Left Section - Branding */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start">
            <h3 className="text-[32px] md:text-[46px] xl:text-[52px] font-extrabold text-[#1775ee] mb-3">
                PostMedia
            </h3>
            <span className="text-base md:text-lg xl:text-xl text-gray-700">
                Connect with friends and the world around you on PostMedia.
            </span>
        </div>

        {/* Right Section - Smaller & Wider Form */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px]">
            <form 
                onSubmit={handleForm} 
                className="w-full bg-white p-5 md:p-6 rounded-lg shadow-lg flex flex-col gap-3"
            >
                <input 
                    placeholder="Username" required type="text" ref={username} 
                    className="h-10 md:h-12 w-full rounded-md border border-gray-300 text-sm md:text-base pl-4 focus:outline-none" 
                />
                <input 
                    placeholder="Email" required type="email" ref={email} 
                    className="h-10 md:h-12 w-full rounded-md border border-gray-300 text-sm md:text-base pl-4 focus:outline-none" 
                />
                <input 
                    placeholder="Password" autoComplete="true" required minLength={6} type="password" ref={password} 
                    className="h-10 md:h-12 w-full rounded-md border border-gray-300 text-sm md:text-base pl-4 focus:outline-none" 
                />

                {/* Buttons */}
                <button 
                  type="submit" 
                  disabled={isFetching} 
                  className="h-10 md:h-12 w-full rounded-md bg-[#1775ee] text-white text-sm md:text-base font-medium cursor-pointer"
              >
                  {isFetching ? "Loading..." : "Log In"}
              </button>

              <button 
                  onClick={handleRegister} 
                  className="h-10 md:h-12 w-full rounded-md bg-[#42b72a] text-white text-sm md:text-base font-medium cursor-pointer"
              >
                  Create a New Account
              </button>




            </form>
        </div>
    </div>
</div>






    </>
  );
}