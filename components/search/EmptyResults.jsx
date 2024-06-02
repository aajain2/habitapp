import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../../constants/images'

const EmptyResults = ({
  message,
  textStyles
}) => {
  return (
    <View className="flex justify-center items-center h-32">
      <Image 
        className="w-10 h-10 mb-2"
        source={images.sadFace}
        resizeMode="contain"
      />

      <Text className="font-inter-bold text-base">Uh oh!</Text>
      <Text className={`font-inter-regular text-sm ${textStyles}`}>{message}</Text>
    </View>
  )
}

export default EmptyResults