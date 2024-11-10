import React from 'react'
import Logo from '../utils/Logo'
import LogoutBtn from './LogoutBtn'

function Header() {
  return (
    <div className='border-b-2 p-2 flex justify-between'>
      <Logo/>
      <LogoutBtn/>
    </div>
  )
}

export default Header