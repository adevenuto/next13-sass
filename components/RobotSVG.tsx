import React from 'react'
import { motion } from 'framer-motion'

interface robotProps {
  animate?: boolean,
  height?: string,
  width?: string,
  className?: string
}

export const RobotSVG = ({
  animate,
  height,
  width,
  className
}: robotProps) => {
  const paths = ['M12 5L17.6569 10.6569', 'M22 1L22 9', 'M31.8284 5.17157L26.1716 10.8284']
  return (
    <div className={`${width} ${height}`}>
      <svg className={className} width="100%" viewBox='0 0 44 52' fill="none" preserveAspectRatio="xMidYMid meet">
        <path d="M22 15.5147L22 23.5147" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="22" cy="15.5147" r="4" fill="#000"/>
        <rect x="7" y="25.5147" width="30" height="24" rx="3" fill="#D6D6D6" stroke="#000" strokeWidth="4"/>
        <circle cx="15" cy="33.5147" r="2" fill="#000"/>
        <circle cx="29" cy="33.5147" r="2" fill="#000"/>
        <path d="M18 41.5147H26" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
        <path d="M42 33.5147L42 41.5147" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
        <path d="M2 33.5147L2 41.5147" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
        {animate && paths.map(path => (
          <motion.path
            key={path}
            initial={{ pathLength: 1, pathOffset: 1 }}
            animate={{ pathLength: .1, pathOffset: 0 }}
            exit={'exit'}
            transition={{
              duration: .5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0
            }}
            stroke="#000"
            strokeOpacity={1}
            strokeLinecap="round"
            strokeWidth={3}
            d={path}
          />
        ))}
      </svg>
    </div>
  )
}



