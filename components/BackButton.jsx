import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const BackButton = ({
  containerStyles,
  handlePress
}) => {
  return (
    <TouchableOpacity className={`z-50 ${containerStyles}`} onPress={handlePress}>
      <AntDesign name="left" size={24} color="black" />
    </TouchableOpacity>
    
  )
}

export default BackButton