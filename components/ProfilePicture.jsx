import { View, Text, Image } from 'react-native'
import React from 'react'

const ProfilePicture = ({
  source
}) => {
  return (
    <Image 
      className="w-10 h-10 rounded-full"
      source={{
        uri: source
      }}
    />
  )
}

export default ProfilePicture