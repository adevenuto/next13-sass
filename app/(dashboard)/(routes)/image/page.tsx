"use client"

import { Image as LucideImage, DownloadIcon } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from 'axios'


import { formSchema, imageCountOptions, imageResolutionOptions } from './constants'
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
import { EmptySection } from '@/components/EmptySection'
import { RobotSVG } from '@/components/RobotSVG'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import { useProModal } from '@/app/hooks/use-pro-modal'



export const ImageGen = () => {
  const router = useRouter()
  const [images, setImages] = useState([])
  const proModal = useProModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    }
  })

  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])
      
      const response = await axios.post('/api/image', values)
      const urls = response.data.map((image: {url: string}) => image.url) 
      
      setImages(urls)
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
        title="Image Generation"
        description="Turn your prompt to beautifully crafted ai images"
        icon={LucideImage}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-6'>
                    <FormControl className='p-0 m-0'>
                      <Input 
                        className='text-lg border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='A beautiful sunrise'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {imageCountOptions.map(option => (
                          <SelectItem 
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField 
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select resolution" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {imageResolutionOptions.map(option => (
                          <SelectItem 
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

          {images.length===0 && !isLoading && (
            <EmptySection label="Lets start creating some images!">
              <RobotSVG height="h-28" width="w-28" />
            </EmptySection>
          )}

          {isLoading && (
            <EmptySection label="Creating images...">
              <RobotSVG animate height="h-28" width="w-28" />
            </EmptySection>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {images.map(src => (  
              <Card 
                key={src}
                className="overflow-hidden border rounded-lg"
              >
                <div className="relative aspect-square">
                  <Image 
                    src={src} 
                    alt="Image"
                    fill
                  />
                </div>
                <CardFooter className="p-2">
                  <Button
                  onClick={() => window.open(src)}
                    variant={'outline'}
                    className='w-full'
                  >
                    <DownloadIcon className='w-4 h-4 mr-2'/>
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default ImageGen

