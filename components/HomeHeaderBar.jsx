import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import TrabitHeader from './TrabitHeader'
import { FontAwesome5 } from '@expo/vector-icons';
import ProfilePicture from './ProfilePicture';

const HomeHeaderBar = ({
  profilePicture
}) => {
  return (
    <View>
      <View className="flex-row">
        <View className="pl-4 h-10 justify-center">
          <FontAwesome5 name="user-friends" size={24} color="white" />
        </View>

        <View className="flex-auto"></View>

        <View className="h-10 pr-8 justify-center">
          <FontAwesome5 name="calendar" size={24} color="white" />
        </View>

        <View className="pr-4 h-10 justify-center">
          <TouchableOpacity className="border" onPress={() => console.log("Pressed")}>
            <ProfilePicture
              source={profilePicture}
              dimensions={32}
            />
          </TouchableOpacity>
        </View>
      </View>
      

      <TrabitHeader 
        color="white"
      />
    </View>
  )
}

export default HomeHeaderBar