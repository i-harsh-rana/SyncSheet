import React, {useState} from 'react'
import { IoPersonAddOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Input from '../../utils/Input';
import { useForm } from 'react-hook-form';
import { BsSend } from "react-icons/bs";

function InviteButton() {
  const [inviteWindow, setInviteWindow] = useState(true);
  const [inviteSendStatus, setInviteSendStatus] = useState(false);
  const {register: inviteRegister, handleSubmit: inviteHandleSubmit, formState: {errors: inviteError}, reset: inviteReset} = useForm();
  const [previousInvites, setPreviousInvites] = useState(null);

  const {data, isLoading, isError} = useQuery({

  })

  const handleInviteSend = async()=>{

  }

  return (
    <div>
        <button 
        onClick={()=>setInviteWindow(true)}
        className='flex items-center gap-3 px-3 py-2 rounded-md text-main-text bg-white shadow-sm font-light text-sm border-[0.01rem]'>
            Invite <IoPersonAddOutline />
        </button>

        <AnimatePresence>
          {inviteWindow && (
              <motion.div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setInviteWindow(false)}
              >
                  <motion.div
                      className="bg-bg-main p-8 rounded-xl w-[40rem]"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      onClick={(e) => e.stopPropagation()}
                  >
                    <div className='flex items-center font-extralight text-2xl'>
                      Invites <span className='pl-4'> <IoPersonAddOutline/></span>
                    </div>
                    
                    <div className='border-[0.1rem] p-5 mt-7 rounded-xl'>
                      Invite User:
                      <div className='mt-5'>
                        <form onSubmit={inviteHandleSubmit(handleInviteSend)} className='flex '>
                          <div className='w-4/5 mr-4'>
                            <Input 
                            label="Email"
                            {...inviteRegister("email", { required: 'Email is required' })}
                            error={inviteError.email?.message}
                            />
                          </div>
                         <div className='h-[7rem]  place-content-center'>
                          <button className='border-[0.07rem] overflow-hidden px-5 py-2 h-10 rounded-xl ' 
                            type='submit' 
                            onClick={()=>setInviteSendStatus(!inviteSendStatus)}>
                              <div className='flex items-center justify-between'>
                                Send
                                <motion.div
                                initial={{x: 0, y: 0}}
                                animate={{x: inviteSendStatus ? 31 : 0, y: inviteSendStatus ? -21 : 0}}
                                transition={{delay: 0.5, ease: 'easeInOut'}}
                                className='ml-3'
                                >
                                
                                <BsSend />
                                </motion.div>
                              </div>
                            </button>
                         </div>
                        </form>
                      </div>
                    </div>

                    <div className='border-[0.1rem] p-5 mt-3 rounded-xl'>
                      Pending Invites:
                      {previousInvites === null && 
                        <>
                          <div className=' h-[5rem] flex justify-center items-center'>
                            <span className='font-extralight opacity-50'>No Pending Invites</span>
                          </div>
                        </>
                      }
                    </div>
                    
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>  
    </div>
  )
}

export default InviteButton