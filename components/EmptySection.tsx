import React from 'react'

interface emptySectionProps {
  children?: React.ReactNode
  label?: string
} 

export const EmptySection = ({
  children,
  label,
}: emptySectionProps) => {
  return (
    <div className='p-3 rounded-lg'>
      <div className="flex flex-col items-center justify-center space-y-8">
        { children }
        <p className="text-base text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
