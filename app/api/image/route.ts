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
    const { prompt, amount='1', resolution="512x512" } = await req.json()

    if(!userId) return new NextResponse('Unauthorized', {status: 401})
    if(!openai.apiKey) return new NextResponse('Api key has not been configured', {status: 500})
    if(!prompt) return new NextResponse('A prompt is required', {status: 400})
    if(!amount) return new NextResponse('A amount is required', {status: 400})
    if(!resolution) return new NextResponse('A resolution is required', {status: 400})

    const freeTrial = await checkApiLimit()
    if(!freeTrial) {
      return new NextResponse('Free trial has expired', {
        status: 403
      })
    }

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      size: resolution,
      quality: 'standard',
      n: parseInt(amount)
    })

    await increaseApiLimit()

    return NextResponse.json(response.data, {status: 200})
  } catch (error) {
    console.log('[IMAGE_ERROR]', error)
    return new NextResponse('Internal server error', {status: 500})
  }
}
