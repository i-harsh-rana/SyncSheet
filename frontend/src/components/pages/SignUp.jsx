import React, {useState} from 'react'
import {motion} from 'framer-motion'
import Logo from '../utils/Logo'
import { useForm } from 'react-hook-form'
import Input from '../utils/Input'
import { Link } from 'react-router-dom'
import image from '../../assets/signupPageImage.jpg'

function SignUp() {
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const [hidePassword, setHidePassword] = useState(false);

  const handleSignup = ()=>{

  };

  return (
    <div className='m-3 flex flex-col lg:flex-row text-main-text'>
      {/* Form Section */}
      <div className='flex justify-center items-center w-full lg:w-2/3'>
        <div className='grid place-content-center w-4/5'>
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
            <div className='text-center text-xl font-light text-main-text mb-9 mt-3'>
              Welcome User!
            </div>
            <div>
              <form onSubmit={handleSubmit(handleSignup)}>
                <div className='grid grid-cols-2 gap-4'>
                  <div className=''>
                    <Input
                      label="Full Name"
                      {...register("fullName", { required: 'Full Name is required' })}
                      error={errors.fullName?.message}
                    />
                    <Input
                      label="Username"
                      {...register("username", { required: 'Username is required' })}
                      error={errors.username?.message}
                    />
                  </div>
                  <div>  
                    <Input
                      label="Email"
                      type='email'
                      {...register("email", { required: 'Email is required' })}
                      error={errors.email?.message}
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
                  </div>
                  <div className='col-span-2'>
                    <Input
                      type='file'
                      label="Avatar"
                      accept='image/*'
                      {...register("avatar", { required: 'Avatar is required' })}
                      error={errors.avatar?.message}
                    />
                  </div>
                </div>
                
                {/* Login Button and SignUp Link */}
                <div className='flex justify-between items-end mt-6'>
                  <motion.button
                  initial={{scale: 1}}
                  whileHover={{scale: 1.03}}
                  whileTap={{scale: 0.95}}
                  type='submit' className='text-white font-light bg-golden text-sm px-6 py-2 rounded-full'>
                    SignUp <i className="fa-solid fa-arrow-right-to-bracket ml-1"></i>
                  </motion.button>
                  <Link to='/login'>
                    <div className='text-sm font-light text-golden cursor-pointer hover:underline '>
                      Old User? Please Login
                    </div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className='rounded-xl relative mb-5 lg:mb-0'>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-block' }} 
          className='font-extralight text-3xl absolute m-3 bottom-0 left-0'>
          <i className="uil uil-link text-white m-1"></i>
        </motion.div>
        <img src={image} alt="loginPage" className='w-[30rem] rounded-xl shadow-inner border-[0.05rem] border-golden'/>
      </div>
  
      
    </div>
  )
}

export default SignUp