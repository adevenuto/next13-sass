import React from 'react'
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from '@/components/ui/avatar'
import { useUser } from '@clerk/nextjs'

export const UserAvatar = () => {
  const {user} = useUser()
  console.log(user)
  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
