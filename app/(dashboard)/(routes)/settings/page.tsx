import Heading from '@/components/Heading'
import { SettingsIcon } from 'lucide-react'
import React from 'react'

const Settings = () => {
  return (
    <div>
      <Heading
        title='Settings Page'
        description='Manage account settings'
        icon={SettingsIcon}
        iconColor='text-gray-700'
        bgColor='text-gray-700/10'
      ></Heading>
    </div>
  )
}

export default Settings


