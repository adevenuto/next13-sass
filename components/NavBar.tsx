import React from 'react'
import { UserButton } from "@clerk/nextjs"
import SideBarToggle from './SideBarToggle'

export const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-3">
      <SideBarToggle />
      <div className="ml-auto">
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default NavBar
