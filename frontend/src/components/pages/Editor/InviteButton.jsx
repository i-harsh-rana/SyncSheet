import React from 'react'
import { IoPersonAddOutline } from "react-icons/io5";

function InviteButton() {
  return (
    <div>
        <button className='flex items-center gap-3 px-3 py-2 rounded-md text-main-text bg-white shadow-sm font-light text-sm border-[0.01rem]'>
            Invite <IoPersonAddOutline />
        </button>
    </div>
  )
}

export default InviteButton