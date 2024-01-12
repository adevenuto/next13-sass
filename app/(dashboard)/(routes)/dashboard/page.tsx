"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { ArrowRight, CodeIcon, Image, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
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
  return (
    <>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-center md:text-4xl">
          Explore the power of AI
        </h2>
        <p className="text-sm font-light text-center text-gray-500 md:text-lg">
          Chat with the smartest AI - Experience the power of Ai
        </p>
      </div>
      <div className="px-4 mx-auto space-y-4 sm:w-3/4 lg:w-1/2">
        {tools.map(tool => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="flex items-center justify-between p-4 transition cursor-pointer border-black/5 hover:shadow-md"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5"/>
          </Card>
        ))}
      </div>
    </>
    
  )
}
