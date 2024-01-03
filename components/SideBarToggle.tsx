import { Menu } from 'lucide-react'
import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SideBar } from '@/components/SideBar'

export const SideBarToggle = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className='w-10 h-10 p-2 border rounded-full hover:bg-gray-100 md:hidden border-black/5'>
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent 
        side="left"
        className="p-0 w-72"
      >
        <SideBar />
      </SheetContent>
    </Sheet>
  )
}

export default SideBarToggle
