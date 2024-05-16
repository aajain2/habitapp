import { View, Text, Image } from 'react-native'
import React from 'react'
import AddFriendButton from '../AddFriendButton'

const ProfileCard = ({
  name,
  username,
  profilePicture,
  handleAdd,
  friendStatus,
}) => {
  return (
    <View className="flex-row my-1">
      <Image 
        className="w-[40] h-[40] rounded-full"
        source={{
          uri: profilePicture
        }}
      />
      <View className="justify-center ml-2">
        <Text className="font-inter-medium text-sm">{name}</Text>
        <Text className="font-inter-regular text-xs">{username}</Text>
      </View>
      <View className="ml-auto justify-center">
        <AddFriendButton friendStatus={friendStatus} handleAdd={handleAdd} />
      </View>
    </View>
  )
}

export default ProfileCard