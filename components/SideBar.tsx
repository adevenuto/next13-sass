"use client"

import Link from 'next/link'
import React from 'react'
import { Montserrat } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Code2, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { RobotSVG } from './RobotSVG'
import ApiLimitDisplay from './ApiLimitDisplay'

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
    label: 'Code Gen',
    icon: Code2,
    href: "/code",
    color: "text-green-700"
  },
  {
    label: 'Settings',
    icon: Settings,
    href: "/settings"
  },
]

interface SideBarProps {
  apiLimitCount: number,
  isPro: boolean
}

export const SideBar = ({
  apiLimitCount = 0,
  isPro
}: SideBarProps) => {
  const pathName = usePathname()
  return (
    <div className="flex flex-col h-full gap-3 py-3 text-white bg-gray-800">
        <div className="flex-1 px-4">
          <Link className="mr-1" href="/dashboard">
            <div className="flex items-center mb-16">
              <RobotSVG animate height="w-10" width="w-10"/>
              <h1 className={cn('self-end text-2xl font-bold leading-none ml-1', montserrat.className)}>
                { process.env.NEXT_PUBLIC_APP_NAME }
              </h1>
            </div>
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
        <ApiLimitDisplay
          isPro={isPro}
          apiLimitCount={apiLimitCount}
        ></ApiLimitDisplay>
    </div>
  )
}
