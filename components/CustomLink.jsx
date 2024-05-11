import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomLink = ({
  title,
  textStyles,
  containerStyles,
  handleClick
}) => {
  return (
    <TouchableOpacity
      className={containerStyles}
      handleClick={handleClick}
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