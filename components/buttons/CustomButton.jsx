import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      className={`bg-blue rounded-full w-52 h-11 flex justify-center items-center ${containerStyles}`}
      disabled={isLoading}
      onPress={handlePress}
    >
      <Text className={`font-inter-bold text-sm text-white ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton