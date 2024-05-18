import { View, Text } from 'react-native'
import React from 'react'

const Streak = ({
  containerStyles,
  days = 0
}) => {
  return (
    <View className={containerStyles}>
      <Text className="font-inter-regular text-white text-3xl text-right">🔥 {days} days</Text>
      <Text className="font-inter-regular text-white text-right">Streak</Text>
    </View>
  )
}

export default Streak