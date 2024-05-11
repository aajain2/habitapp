import { View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard