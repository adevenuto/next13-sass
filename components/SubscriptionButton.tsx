"use client"

import axios from "axios"
import { Button } from "./ui/button"


interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({
  isPro = false
}: SubscriptionButtonProps) => {

  const handleClick = async () => {
    try {
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      console.log('BILLING_ERROR:', error)
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={isPro ? "default" : "upgrade"}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
    </Button>
  )
}

