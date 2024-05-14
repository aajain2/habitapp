import { View, Text, Image } from 'react-native'
import React from 'react'
import AddFriendButton from '../AddFriendButton'

const ProfileCard = () => {
  return (
    <View className="flex-row">
      <Image 
        className="w-[40] h-[40] rounded-full"
        source={{
          uri: "https://picsum.photos/200"
        }}
      />
      <View className="justify-center ml-2">
        <Text className="font-inter-medium text-sm">Profile Name</Text>
        <Text className="font-inter-regular text-xs">@meow</Text>
      </View>
      <View className="ml-auto justify-center">
        <AddFriendButton state="add" />
      </View>
    </View>
  )
}

export default ProfileCard