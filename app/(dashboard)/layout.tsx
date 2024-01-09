import React, { ReactNode } from 'react'
import NavBar from '@/components/NavBar'
import { SideBar } from '@/components/SideBar'
import { getApiLimitCount } from '@/lib/api-limit'

export const layout = async ({
  children
}:{
  children: ReactNode
}) => {

  const apiLimitCount = await getApiLimitCount()

  return (
    <div className="relative h-full">
      <div className="z-50 hidden h-full bg-gray-900 md:flex md:fixed md:flex-col md:inset-y-0 md:w-72">
        <SideBar apiLimitCount={apiLimitCount}/>
      </div>
      <main className='md:pl-72'>
        <NavBar />
        <div className="mt-14">
          {children}
        </div>
      </main>
    </div>
  )
}

export default layout
