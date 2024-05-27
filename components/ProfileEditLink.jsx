import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const ProfileEditLink = ({
  containerStyles,
  field,
  value,
  handlePress
}) => {
  return (
    <TouchableOpacity 
      className={`w-full flex-row items-center ${containerStyles}`}
      onPress={handlePress}
    >
      <Text className="text-base w-24 font-inter-bold">{field}</Text>

      <Text className="text-base text-black/70 font-inter-regular">{value}</Text>

      <View className="ml-auto">
        <AntDesign name="right" size={16} color="black" />
      </View>
    </TouchableOpacity>
  )
}

export default ProfileEditLink