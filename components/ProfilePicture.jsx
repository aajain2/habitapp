import { View, Text, Image } from 'react-native'
import React from 'react'

const ProfilePicture = ({
  dimensions = 40,
  source
}) => {
  return (
    <Image 
      className={`w-[${dimensions}px] h-[${dimensions}px] rounded-full`}
      source={{
        uri: source
      }}
    />
  )
}

export default ProfilePicture