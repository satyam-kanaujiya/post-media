import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function Protected({children}) {
  const {user} = useAuthContext(); 
  if(!user){
    return(
        <Navigate replace={true} to="/login"></Navigate>
    )
  }
  else{
    return children
  }
}

export default Protected
