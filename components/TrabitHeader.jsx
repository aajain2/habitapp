import { View, Text } from 'react-native'
import React from 'react'

const TrabitHeader = ({
  color = "black"
}) => {
  return (
    <View className="absolute w-full h-10 justify-center z-10">
      <Text className={`text-3xl font-alata-regular text-center text-${color}`}>TRABIT</Text>
    </View>
  )
}

export default TrabitHeader