import { View, TextInput, Text } from 'react-native'
import React from 'react'

const SignUpInput = ({
  value,
  placeholder,
  handleChangeText,
  containerStyles,
  error,
  errorMessage = "Error!",
  password = false,
  ...props
}) => {
  return (
    <View className={containerStyles}>
        <TextInput 
          className="border-b-2 w-44 text-center text-xs py-2"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={password}
          {...props}
        />

        {error && 
          <Text className="text-[10px] text-red-500 font-inter-bold mt-1">
            {errorMessage}
          </Text>
        }
    </View>
  )
}

export default SignUpInput