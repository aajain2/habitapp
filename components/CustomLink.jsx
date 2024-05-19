import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomLink = ({
  title,
  textStyles,
  containerStyles,
  handlePress
}) => {
  return (
    <TouchableOpacity
      className={containerStyles}
      onPress={handlePress}
    >
      <Text
        className={`${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomLink