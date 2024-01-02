import React from 'react'
import { UserButton } from "@clerk/nextjs"
import { Ghost, Menu } from 'lucide-react'
import { Button } from './ui/button'

export const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-3">
      <Menu className='md:hidden'/>
      
      <div className="ml-auto">
        <UserButton afterSignOutUrl='/' />
      </div>
      
    </div>
  )
}

export default NavBar
