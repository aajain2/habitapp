import { View, Text } from 'react-native'
import React from 'react'

const TrabitHeader = ({
  color = "black",
  absolute = true,
  containerStyles
}) => {
  return (
    <View className={`w-full h-10 justify-center ${absolute && "absolute"} ${containerStyles}`}>
      <Text className={`text-3xl font-alata-regular text-center text-${color}`}>TRABIT</Text>
    </View>
  )
}

export default TrabitHeader