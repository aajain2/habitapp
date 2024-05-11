import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity className="border-2 border-red-500">
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton