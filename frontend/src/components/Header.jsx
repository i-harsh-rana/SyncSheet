import React from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='border-b-2 p-2'>
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ display: 'inline-block' }} 
            className='font-extralight text-2xl'>
                SyncSheet
        </motion.div>

    </div>
  )
}

export default Header