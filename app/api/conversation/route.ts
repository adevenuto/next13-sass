import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
})

export async function POST(
  req: Request
) {
  try {
    const { userId } : { userId: string | null } = auth()
    
    const { messages } = await req.json()

    if(!userId) return new NextResponse('Unauthorized', {status: 401})
    if(!openai.apiKey) return new NextResponse('Api key has not been configured', {status: 500})
    if(!messages) return new NextResponse('Message was not returned from OpenAI', {status: 400})

    const freeTrial = await checkApiLimit()
    if(!freeTrial) {
      return new NextResponse('Free trial has expired', {
        status: 403
      })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages
    })

    await increaseApiLimit()

    const message = response.choices[0].message

    return NextResponse.json(message, {status: 200})
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error)
    return new NextResponse('Internal server error', {status: 500})
  }
}
