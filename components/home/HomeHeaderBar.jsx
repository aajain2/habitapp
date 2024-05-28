import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import TrabitHeader from '../TrabitHeader'
import ProfilePicture from '../ProfilePicture';
import icons from '../../constants/icons';
import { router } from 'expo-router';

const HomeHeaderBar = ({
  profilePicture
}) => {
  return (
    <View className="flex-row">
      <TrabitHeader 
        color="white"
      />

      <View className="pl-4 h-10 justify-center">
        <TouchableOpacity
          onPress={() => router.navigate("/friends")}
        >
          <Image 
            className="h-8 w-8"
            resizeMode="contain"
            source={icons.addFriends}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-auto"></View>

      <View className="pr-4 h-10 justify-center">
        <TouchableOpacity
          onPress={() => router.navigate("/profile")}
        >
          <ProfilePicture
            source={profilePicture}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeHeaderBar