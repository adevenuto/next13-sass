"use client"

import { LandingHero } from "@/components/LandingHero"
import { LandingNavBar } from "@/components/LandingNavBar"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Landing() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if(isSignedIn) router.push('/dashboard')
  }, [])
  return (
    <div className="h-full">
      <LandingNavBar />
      <LandingHero />
    </div>
  )
}
