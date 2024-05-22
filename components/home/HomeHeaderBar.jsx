import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import TrabitHeader from '../TrabitHeader'
import { FontAwesome5 } from '@expo/vector-icons';
import ProfilePicture from '../ProfilePicture';
import icons from '../../constants/icons';

const HomeHeaderBar = ({
  profilePicture
}) => {
  return (
    <View className="flex-row">
      <TrabitHeader 
        color="white"
      />

      <View className="pl-4 h-10 justify-center">
        <TouchableOpacity>
          <Image 
            className="h-8 w-8"
            resizeMode="contain"
            source={icons.addFriends}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-auto"></View>

      <View className="h-10 pr-4 justify-center">
        <TouchableOpacity>
          <Image 
            className="h-8 w-8"
            resizeMode="contain"
            source={icons.calendar}
          />
        </TouchableOpacity>
      </View>

      <View className="pr-4 h-10 justify-center">
        <TouchableOpacity>
          <ProfilePicture
            source={profilePicture}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeHeaderBar