import React from 'react'
import Logo from '../utils/Logo'
import LogoutBtn from './LogoutBtn'
import HeaderMenu from './HeaderMenu'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <div className='border-b-2 p-2 flex justify-between'>
      <Logo/>
      { 
        authStatus && 
          <>
          <HeaderMenu/>
          <LogoutBtn/>
          </>
      }
      
    </div>
  )
}

export default Header