"use client"

import { MessageSquare } from 'lucide-react'
import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from 'axios'

import Heading from '@/components/Heading'
import { formSchema } from './constants'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ChatCompletionAssistantMessageParam } from 'openai/resources/index.mjs'
import { cn } from '@/lib/utils'
import { Empty } from '@/components/Empty'



export const Conversation = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionAssistantMessageParam[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionAssistantMessageParam = {
        role: "user",
        content: values.prompt
      }
      const newMessages = [...messages, userMessage]
      const response = await axios.post('/api/conversation', {
        messages: newMessages
      })
      setMessages((current) => [...current, userMessage, response.data])
      form.reset()
    } catch (error: any) {
      // TODO: catch token limit error and trigger pro modal
    } finally {
      router.refresh()
    }
  }
  return (
    <>
      <Heading 
        title="Conversation"
        description="A conversation model to stimulate your mind"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className='mb-10'>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm'
            >
              <FormField 
                name="prompt"
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='p-0 m-0'>
                      <Input 
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='How far away is the sun?'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                className='w-full col-span-12 lg:col-span-2'
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.length===0 && !isLoading && (
              <Empty />
            )}
            {messages.map(message => (
              <div 
                key={message.content}
                className={cn("border px-6 py-6 whitespace-pre-line", {
                  "bg-gray-700 text-gray-100": message.role==="assistant",
                  "bg-gray-100 text-gray-700": message.role!="assistant",
                })}
              >
                {message.content}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Conversation

