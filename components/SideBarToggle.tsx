import { Menu } from 'lucide-react'
import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SideBar } from '@/components/SideBar'
import { checkSubscription } from '@/lib/subscription'
import { getApiLimitCount } from '@/lib/api-limit'

export const SideBarToggle = async () => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()
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
        <SideBar 
          isPro={isPro}
          apiLimitCount={apiLimitCount}
        />
      </SheetContent>
    </Sheet>
  )
}

export default SideBarToggle
