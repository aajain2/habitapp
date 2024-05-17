import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import TrabitHeader from './TrabitHeader'
import { FontAwesome5 } from '@expo/vector-icons';
import ProfilePicture from './ProfilePicture';
import icons from '../constants/icons';

const HomeHeaderBar = ({
  profilePicture
}) => {
  return (
    <View>
      <View className="flex-row">

        <TrabitHeader 
          color="white"
        />

        <View className="pl-4 h-10 justify-center">
          <TouchableOpacity>
            <Image 
              className="h-9 w-9"
              resizeMethod="stretch"
              source={icons.addFriends}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-auto"></View>

        <View className="h-10 pr-8 justify-center">
          <TouchableOpacity>
            <FontAwesome5 name="calendar" size={24} color="white" />
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
    </View>
  )
}

export default HomeHeaderBar