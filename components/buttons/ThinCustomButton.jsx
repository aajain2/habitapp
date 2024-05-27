import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ThinCustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`bg-blue rounded-full px-2 flex justify-center items-center ${containerStyles}`}
      disabled={isLoading}
      onPress={handlePress}
    >
      <Text className={`font-inter-regular text-sm text-white ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default ThinCustomButton