import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Landing() {
  return (
    <div className="flex">
      <Link href="/sign-in">
        <Button>Sign-in</Button>
      </Link>
      <Link href="/sign-up">
        <Button>Register</Button>
      </Link>
    </div>
  )
}
