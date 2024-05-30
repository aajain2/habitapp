import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BackButton from '../buttons/BackButton';
import MenuButton from '../buttons/MenuButton';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { handleLogOut } from '../../functions/auth';
import { useGlobalContext } from '../../context/GlobalProvider';

const ProfileHeaderBar = ({
  containerStyles,
  title,
  subtitle,
  logoutButton
}) => {
  const { setIsLogged, setUser } = useGlobalContext();

  const logout = async () => {
    try {
      await handleLogOut()
      setIsLogged(false)

      while (router.canGoBack()) {
        router.back()
      }

      router.replace("/")

      setUser(null)
    } catch (e) {
      Alert.alert("Error", e.message)
    }
  }

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

      {logoutButton ?  
        <View className="pr-4 h-10 justify-center">
          <TouchableOpacity 
            onPress={() => logout()}
          >
            <MaterialCommunityIcons name="logout" size={24} color="red" />
          </TouchableOpacity>
        </View> : 
        <MenuButton
          containerStyles="pr-4 h-10 justify-center" 
          size={24}
        />
      }
    </View>
  )
}

export default ProfileHeaderBar