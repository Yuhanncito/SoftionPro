import React from 'react'
import { LogeTitle } from '../atoms/TextsGlobal'
import { useNavigate } from 'react-router-dom'

function Logo({isOpen}) {
  const Navigate = useNavigate()
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={()=> Navigate('/App') }>
        <img src="/images/logo.png" alt="" className={` max-sm:w-7 max-sm:h-7 ${isOpen ? 'w-20 h-20' : 'w-8 h-8'} transition-all mb-2 `} />
        {
          isOpen && <LogeTitle hidden={'max-sm:hidden'} text="Softion Pro" />
        }
    </div>
  )
}

export default Logo