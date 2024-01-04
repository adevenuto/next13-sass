import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { OpenAI  } from 'openai'

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

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages
    })

    const message = response.choices[0].message

    return NextResponse.json(message, {status: 200})
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error)
    return new NextResponse('Internal server error', {status: 500})
  }
}
