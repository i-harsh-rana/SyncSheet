import {useGoogleLogin} from "@react-oauth/google";
import { googleAuth } from '../utils/googleApi.js'
import { FcGoogle } from "react-icons/fc";
import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authStore.js";

function GoogleLoginSignup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginWithGoogle = async(authResult)=>{
        try {
          if(authResult.code){
            const result = await googleAuth(authResult.code);
            dispatch(login(result.data?.data)); 
            navigate('/');
          }
        } catch (error) {
          console.error('Google login failed:', error);
        }
      }
    
      const googleLogin = useGoogleLogin({
        onSuccess: handleLoginWithGoogle,
        onError: handleLoginWithGoogle, 
        flow: 'auth-code'
      })
  return (
    <div><button onClick={googleLogin}>Login Google <FcGoogle /></button></div>
  )
}

export default GoogleLoginSignup