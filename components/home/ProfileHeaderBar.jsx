import { View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import BackButton from '../buttons/BackButton';
import MenuButton from '../buttons/MenuButton';
import { router } from 'expo-router';

const ProfileHeaderBar = ({
  containerStyles,
  title,
  subtitle
}) => {
  return (
    <View className={`flex-row ${containerStyles}`}>
      <BackButton 
        containerStyles="pl-4 h-10 justify-center"
        handlePress={() => router.back()}
      />

      <View className="flex-auto flex items-center justify-center">
        <Text className="font-inter-bold text-base">{title}</Text>
        {subtitle && 
          <Text className="text-xs font-inter-medium text-gray">{subtitle}</Text>
        }
      </View>

      <MenuButton
        containerStyles="pr-4 h-10 justify-center" 
        size={24}
      />
    </View>
  )
}

export default ProfileHeaderBar