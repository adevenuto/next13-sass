import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MAX_FREE_COUNTS } from '@/app/constants'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useProModal } from '@/app/hooks/use-pro-modal'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ApiLimitCountProps {
  apiLimitCount: number,
  isPro: boolean
}

export const ApiLimitCount = ({
  apiLimitCount,
  isPro
}: ApiLimitCountProps) => {
  const proModal = useProModal()

  // prevent potential hydration errors
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if(!mounted) return null
  
  return (
    <div className={cn("px-3", {
      "hidden": isPro
    })}>
      <Card
        className='bg-white/10 border-0'
      >
        <CardContent className='py-6'>
          <div className="text-center text-sm text-white mb-4 space-y-2">
              <p>{apiLimitCount} / {apiLimitCount}</p>
              <Progress 
                value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
              />
              <Button
                onClick={() => proModal.onOpen()}
                variant="upgrade"
                className='w-full'
              > 
                Upgrade
                <Zap className='h-4 w-4 ml-2 fill-white' />
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ApiLimitCount