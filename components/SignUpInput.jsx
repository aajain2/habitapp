import { View, TextInput, Text } from 'react-native'
import React from 'react'

const SignUpInput = ({
  value,
  placeholder,
  handleChangeText,
  containerStyles,
  caption,
}) => {
  return (
    <View className={containerStyles}>
        <TextInput 
          className="border-b-2 w-44 text-center text-xs py-2"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
        />

        <Text className="text-[10px] font-inter-regular mt-1">
          {caption}
        </Text>
    </View>
  )
}

export default SignUpInput