import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const ChangeSensitiveLink = ({
  title,
  handlePress,
  containerStyles,
}) => {
  return (
    <TouchableOpacity 
      className={`w-full flex-row items-center ${containerStyles}`}
      onPress={handlePress}
    >
      <View className="w-8">
        <MaterialIcons name="lock-open" size={16} color="black" />
      </View>

      <Text className="text-base font-inter-bold">{title}</Text>
    </TouchableOpacity>
  )
}

export default ChangeSensitiveLink