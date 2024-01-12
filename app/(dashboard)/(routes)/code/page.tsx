"use client"

import { Code2 } from 'lucide-react'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { useForm } from 'react-hook-form'
import { ChatCompletionAssistantMessageParam } from 'openai/resources/index.mjs'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from 'axios'
import { useProModal } from '@/app/hooks/use-pro-modal'


import { formSchema } from './constants'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from '@/components/ui/form'
import Heading from '@/components/Heading'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { EmptySection } from '@/components/EmptySection'
import { RobotSVG } from '@/components/RobotSVG'
import { UserAvatar } from '@/components/UserAvatar'



export const Code = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionAssistantMessageParam[]>([])
  const proModal = useProModal()

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
      const response = await axios.post('/api/code', {
        messages: newMessages
      })
      setMessages((current) => [...current, userMessage, response.data])
      form.reset()
    } catch (error: any) {
      if(error?.request?.status===403) {
        form.reset()
        proModal.onOpen()
      } 
    } finally {
      router.refresh()
    }
  }
  return (
    <>
      <Heading 
        title="Code Generation"
        description="Ask me to write some code"
        icon={Code2}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                        className='text-lg border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Ask me a coding question'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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

          {messages.length===0 && !isLoading && (
            <EmptySection label="Let Do some pair programming!">
              <RobotSVG height="h-28" width="w-28" />
            </EmptySection>
          )}

          {isLoading && (
            <EmptySection label="Computing...">
              <RobotSVG animate height="h-28" width="w-28" />
            </EmptySection>
          )}

          <div className="flex flex-col-reverse gap-y-4">
            {messages.map(message => (
              <div 
                key={message.content}
                className={cn("border flex items-center relative px-6 py-6 whitespace-pre-line rounded-lg overflow-auto", {
                  "bg-gray-100 shadow-sm": message.role==="assistant",
                })}
              > 
                <div className="self-start mr-4">
                  {message.role!=='assistant' ? 
                    <UserAvatar /> : 
                    <RobotSVG height="h-10" width="w-10" />}
                </div>
                <div className={cn("text-base leading-[1.8rem]", {
                  "mt-3": message.role==='assistant'
                })}>
                  <ReactMarkdown
                    components={{
                      pre: ({node, ...props}) => (
                        <div className='w-full p-6 my-2 rounded-lg bg-black/10'>
                          <pre {...props} />
                        </div>
                      ),
                      code: ({node, ...props}) => (
                        <code className='p-1 rounded-lg bg-black/10' {...props}/>
                      )
                    }}
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
                
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default Code

