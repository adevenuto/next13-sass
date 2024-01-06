import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { ChatCompletionAssistantMessageParam } from 'openai/resources/index.mjs'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
})

const modelInstructions: ChatCompletionAssistantMessageParam = {
  role: "system",
  content: "You are a code generator that only answers in markdown code snippets. Use code comments for explanations."
}

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
      messages: [modelInstructions, ...messages]
    })

    const message = response.choices[0].message

    return NextResponse.json(message, {status: 200})
  } catch (error) {
    console.log('[CODE_ERROR]', error)
    return new NextResponse('Internal server error', {status: 500})
  }
}