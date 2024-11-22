import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import timeCalculator from '../../utils/timeCalculator';
import { motion } from 'framer-motion';

function Profiile() {
    const {userId} = useParams();

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['user', userId],
        queryFn: async()=>{
         try {
            const response = await axios.get(`/api/v1/user/user/${userId}`, {withCredentials: true});

            if(response.status===200){
                return response.data?.data;
            }else {
                throw new Error(`Unexpected response status: ${response.status}`);
              }      
         } catch (error) {
            console.log(error, "Error in Query"); 
         }   
        }
    })

    if(isLoading){
        return (
          <>
            Loading...
          </>
        )
      }
    
      if(isError){
        return (
          <>
            {error.message}
          </>
        )
      }

  return (
    <div className="w-full h-full flex justify-center items-center p-7 text-main-text font-light overflow-hidden"> 
        <div className="bg-white border-[0.07rem] p-5 rounded-xl relative w-[25rem] mt-16 h-auto space-y-4 flex flex-col items-center shadow-lg">
            <motion.img 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
            src={data.avatar} 
            alt={`${data.fullName}'s avatar`}
            className="w-[11rem] h-[11rem] object-cover rounded-full shadow-inner"
            />
            <motion.div
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-2"
            >
                <div>Full Name: <span className="font-medium">{data.fullName}</span></div>
                <div>Username: <span className="font-medium">{data.username}</span></div>
                <div>Email: <span className="font-medium">{data.email}</span></div>
                <div>Joined: <span className="font-medium">{timeCalculator(data.createdAt)}</span></div>
            </motion.div>
        </div>
    </div>

  )
}

export default Profiile