import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const SignUpButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      className={`border-2 border-black bg-blue rounded-xl w-52 h-11 flex justify-center items-center ${containerStyles}`}
      disabled={isLoading}
      onPress={handlePress}
    >
      <Text className={`font-inter-bold text-sm ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default SignUpButton