"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useProModal } from '@/app/hooks/use-pro-modal'
import { Badge } from './ui/badge'
import { DialogDescription } from '@radix-ui/react-dialog'

import { ArrowRight, Check, CodeIcon, Image, MessageSquare, Zap } from "lucide-react"
import { Card } from './ui/card'
import router from 'next/router'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: "Image Gen",
    icon: Image,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image"
  },
  {
    label: "Code Gen",
    icon: CodeIcon,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code"
  },
]

export const ProModal = () => {
  const proModal = useProModal()
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className="flex items-center gap-x-2 font-bold py-2">
              Upgrade To
              <Badge 
                className='uppercase text-sm py-1'
                variant="upgrade"
              >
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
          {tools.map(tool => (
            <Card
              key={tool.href}
              className="flex items-center justify-between p-4 border-black/5"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <Check/>
            </Card>
          ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Button
          variant="upgrade"
          className='w-full'
          size="lg"
        > 
          Upgrade to Premium
          <Zap className='h-4 w-4 ml-2 fill-white' />
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal