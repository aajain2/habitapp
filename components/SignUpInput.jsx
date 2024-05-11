import { View, Text, TextInput } from 'react-native'
import React from 'react'

const SignUpInput = ({
  value,
  placeholder,
  handleChangeText,
  containerStyles,
  ...props
}) => {
  return (
    <View className={containerStyles}>
      <TextInput 
        className="border-b-2 w-44 text-center text-xs py-2"
        placeholder={placeholder}
        value={value}
      />
    </View>
  )
}

export default SignUpInput