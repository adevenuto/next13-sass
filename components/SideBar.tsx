"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Montserrat } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

const montserrat = Montserrat({
  weight: "600",
  subsets: ['latin']
})

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500"
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500"
  },
  {
    label: 'Image Gen',
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700"
  },
  {
    label: 'Video Gen',
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700"
  },
  {
    label: 'Music Gen',
    icon: Music,
    href: "/music",
    color: "text-emerald-500"
  },
  {
    label: 'Code Gen',
    icon: Code,
    href: "/code",
    color: "text-green-700"
  },
  {
    label: 'Settings',
    icon: Settings,
    href: "/settings"
  },
]

export const SideBar = () => {
  const pathName = usePathname()
  return (
    <div className="flex flex-col h-full gap-3 py-3 text-white bg-gray-800">
        <div className="flex-1 px-3">
          <Link href="/dashboard" className='flex items-center mb-14'>
            {/* <div className="relative w-8 h-8 mr-4">
              <Image 
                fill
                alt='logo'
                src='/images/logo.png'
              />
            </div> */}
            <h1 className={cn('text-2xl font-bold', montserrat.className)}>
              NextSass
            </h1>
          </Link>
          <div className="space-y-1">
            {routes.map(route => (
              <Link 
                className={cn('flex justify-start w-full p-3 font-medium rounded-lg cursor-pointer test-sm hover:text-white hover:bg-white/10 text-zinc-400',
                  {'bg-white/10 text-white': route.href===pathName}
                )}
                href={route.href}
                key={route.href}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
    </div>
  )
}
