import { Image } from 'react-native'
import React from 'react'

const ProfilePicture = ({
  containerStyles,
  source
}) => {
  return (
    <Image 
      className={`rounded-full w-10 h-10 ${containerStyles}`}
      source={{
        uri: source
      }}
      resizeMode="contain"
    />
  )
}

export default ProfilePicture