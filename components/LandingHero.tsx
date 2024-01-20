"use client"

import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import TypewriterComponent from 'typewriter-effect'
import { Button } from './ui/button'
import Link from 'next/link'

export const LandingHero = () => {
  const { isSignedIn } = useAuth()

  useEffect(() => {
    console.log(isSignedIn)
  }, [])
  
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Open AI generation for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent 
            options={{
              strings: [
                "Chatting",
                "Image Generation",
                "Code Suggestion's"
              ],
              autoStart: true,
              loop: true
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Increase productivity 10X
      </div>
      <Link 
        href={isSignedIn ? '/dashboard' : 'sign-up'}
        className='block'
      >
        <Button 
          className='rounded-full'
          variant="upgrade"
        >
          Start Generationg For Free
        </Button>
      </Link>
    </div>
  )
}
