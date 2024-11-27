import React from 'react'
import Logo from '../utils/Logo'
import LogoutBtn from './LogoutBtn'
import HeaderMenu from './HeaderMenu'
import { useSelector, } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
 
  return (
    <div className='border-b-2 px-4 flex py-3 justify-between'>
      <Logo/>
      { 
        authStatus && 
        <div className='flex items-center font-light'>
        <HeaderMenu/>
        <LogoutBtn/>
        .</div>
      }
      
    </div>
  )
}

export default Header