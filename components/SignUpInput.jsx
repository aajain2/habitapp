import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`${containerStyles}`}>
        <TextInput 
          className="border-b-2 w-44 text-center text-xs py-2"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={password && !showPassword}
          {...props}
        />

        {password && 
          <TouchableOpacity 
            className="absolute top-1 left-44" 
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons 
              name={showPassword ? "eye" : "eye-off"}
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        }

        {error && 
          <Text className="text-[10px] text-red-500 font-inter-bold mt-1 w-44">
            {errorMessage}
          </Text>
        }
    </View>
  )
}

export default SignUpInput