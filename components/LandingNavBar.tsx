"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { RobotSVG } from "./RobotSVG"
import { DEFAULT_MAX_VERSION } from "tls"

const font = Montserrat({
  weight: "600",
  subsets: ["latin"]
})

export const LandingNavBar = () => {
  const { isSignedIn } = useAuth()
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <RobotSVG animate height="w-10" width="w-10"/>
        <h1 className={cn("font-bold text-2xl text-white self-end leading-none", font.className)}>
          { process.env.NEXT_PUBLIC_APP_NAME ?? ''}
        </h1>
      </Link>
      {!isSignedIn && 
        <div>
          
        </div>
      }
    </nav>
  )
}
