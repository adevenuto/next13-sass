import { Menu } from 'lucide-react'
import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SideBar } from '@/components/SideBar'

export const SideBarToggle = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='md:hidden'/>
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
