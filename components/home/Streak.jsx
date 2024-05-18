import { View, Text } from 'react-native'
import React from 'react'

const Streak = ({
  smaller = false,
  containerStyles,
  days = 0
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`font-inter-regular text-white text-3xl text-right ${smaller && "text-2xl"}`}>🔥 {days} days</Text>
      <Text className={`font-inter-regular text-white text-right ${smaller && "text-xs"}`}>Streak</Text>
    </View>
  )
}

export default Streak