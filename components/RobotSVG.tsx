import React from 'react'
import { motion } from 'framer-motion'

interface robotProps {
  animate?: boolean
}

export const RobotSVG = ({
  animate
}: robotProps) => {
  const paths = ['M12 5L17.6569 10.6569', 'M22 1L22 9', 'M31.8284 5.17157L26.1716 10.8284']
  return (
      <svg width="90" height="96" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 15.5147L22 23.5147" stroke="black" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="22" cy="15.5147" r="4" fill="black"/>
        <rect x="7" y="25.5147" width="30" height="24" rx="3" fill="#D6D6D6" stroke="black" strokeWidth="4"/>
        <circle cx="15" cy="33.5147" r="2" fill="black"/>
        <circle cx="29" cy="33.5147" r="2" fill="black"/>
        <path d="M18 41.5147H26" stroke="black" strokeWidth="4" strokeLinecap="round"/>
        <path d="M42 33.5147L42 41.5147" stroke="black" strokeWidth="4" strokeLinecap="round"/>
        <path d="M2 33.5147L2 41.5147" stroke="black" strokeWidth="4" strokeLinecap="round"/>
        {animate && paths.map(path => (
          <motion.path
            key={path}
            animate={{ pathLength: 1, pathOffset: 0 }}
            initial={{ pathLength: 1, pathOffset: 1 }}
            transition={{
              duration: .6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0
            }}
            stroke="#000"
            strokeOpacity={1}
            strokeLinecap="round"
            strokeWidth={2}
            d={path}
          />
        ))}
      </svg>
  )
}



