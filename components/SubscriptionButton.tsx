"use client"

import axios from "axios"
import { Button } from "./ui/button"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

import { toast } from 'react-hot-toast'


interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({
  isPro = false
}: SubscriptionButtonProps) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      toast.error('Sorry, something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={isPro ? "default" : "upgrade"}
      disabled={isLoading}
    >
      {
        isPro ? 
        "Manage Subscription" : 
        "Upgrade"
      }
      
      <Zap
        className={cn("h-4 w-4 fill-white hidden", {
          "block ml-2": !isPro,
          "animate-spin": isLoading
        })}
      ></Zap>
    </Button>
  )
}

