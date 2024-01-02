import React, { ReactNode } from 'react'
import NavBar from '@/components/NavBar'
import { SideBar } from '@/components/SideBar'

export const layout = ({
  children
}:{
  children: ReactNode
}) => {
  return (
    <div className="relative h-full">
      <div className="z-50 hidden h-full bg-gray-900 md:flex md:fixed md:flex-col md:inset-y-0 md:w-72">
        <SideBar />
      </div>
      <main className='md:pl-72'>
        <NavBar />
        { children }
      </main>
    </div>
  )
}

export default layout
