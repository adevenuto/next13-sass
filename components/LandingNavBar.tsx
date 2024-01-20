"use client"

import { Montserrat } from "next/font/google"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { RobotSVG } from "./RobotSVG"

const font = Montserrat({
  weight: "600",
  subsets: ["latin"]
})

export const LandingNavBar = () => {
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <RobotSVG animate height="w-10" width="w-10"/>
        <h1 className={cn("font-bold text-2xl text-white self-end leading-none", font.className)}>
          { process.env.NEXT_PUBLIC_APP_NAME }
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href="/sign-up">
          <Button
            className="rounded-full"
            variant="outline"
            size="lg"
          >Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
