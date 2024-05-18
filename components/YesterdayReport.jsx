import { View, Text } from 'react-native'
import React from 'react'

const YesterdayReport = () => {
  return (
    <View className="my-4 px-4 border">
      <Text className="text-xl font-inter-bold">
        Yesterday’s Report
      </Text>
      <Text className="font-inter-bold">
        These people did not complete their habit.
      </Text>
    </View>
  )
}

export default YesterdayReport