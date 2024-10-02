import React, { useState } from 'react'
import image from '../../assets/loginPagImage.jpg'
import {motion, useScroll} from 'framer-motion'
import Logo from '../utils/Logo'
import { useForm } from 'react-hook-form'
import Input from '../utils/Input'
import { Link } from 'react-router-dom'


function Login() {
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const [hidePassword, setHidePassword] = useState(false);

  const handleLogin = ()=>{

  };
  return (
    <div className='m-3 flex flex-col lg:flex-row text-main-text'>
      {/* Image Section */}
      <div className='rounded-xl relative mb-5 lg:mb-0'>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-block' }} 
          className='font-extralight text-3xl absolute m-3 bottom-0 right-0'>
          <i className="uil uil-link text-white m-1"></i>
        </motion.div>
        <img src={image} alt="loginPage" className='w-[30rem] rounded-xl shadow-inner border-[0.05rem] border-golden'/>
      </div>
  
      {/* Form Section */}
      <div className='flex justify-center items-center w-full lg:w-2/3'>
        <div className='grid place-content-center w-full max-w-md'>
          {/* Logo */}
          <motion.div
            animate={{ y: [0, -10, 0] }} 
            transition={{
              duration: 3,
              ease: 'easeInOut', 
              repeat: Infinity, 
              repeatType: 'loop', 
            }}
            style={{textAlign: 'center'}}
          >
          <Logo animate={false} size='text-4xl' className='mb-7'/>
          </motion.div>
          
          {/* Form Container */}
          <div
          className='border-[0.01rem] p-7 rounded-xl shadow-lg overflow-hidden'>
            <div className='text-center text-xl font-light text-main-text mb-7 mt-3'>
              Welcome Back User!
            </div>
            <div>
              <form onSubmit={handleSubmit(handleLogin)}>
                <Input
                  label="Username or Email"
                  {...register("usernameOrEmail", { required: 'Username or Email is required' })}
                  error={errors.usernameOrEmail?.message}
                />
                <div className='relative'>
                  <Input
                    label="Password"
                    type={!hidePassword && 'password'}
                    {...register("password", { required: 'Password is required' })}
                    error={errors.password?.message}
                  />
                  <span onClick={()=>setHidePassword(!hidePassword)} className='absolute right-4 top-12'>
                    {hidePassword ? <i className="fa-regular fa-eye text-golden"></i> : <i className="fa-regular fa-eye-slash text-main-text"></i>}
                  </span>
                </div>
                
                {/* Login Button and SignUp Link */}
                <div className='flex justify-between items-end mt-6'>
                  <motion.button
                  initial={{scale: 1}}
                  whileHover={{scale: 1.03}}
                  whileTap={{scale: 0.95}}
                  type='submit' className='text-white font-light bg-golden text-sm px-6 py-2 rounded-full'>
                    Login <i className="fa-solid fa-arrow-right-to-bracket ml-1"></i>
                  </motion.button>
                  <Link to='/signup'>
                    <div className='text-sm font-light text-golden cursor-pointer hover:underline '>
                      New User? Please SignUp
                    </div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default Login