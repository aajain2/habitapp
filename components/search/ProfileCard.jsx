import { View, Text, Image } from 'react-native'
import React from 'react'
import AddFriendButton from '../buttons/AddFriendButton'
import ProfilePicture from '../ProfilePicture'

const ProfileCard = ({
  name,
  username,
  profilePicture,
  handleAdd,
  friendStatus,
}) => {
  return (
    <View className="flex-row my-1">
      <ProfilePicture 
        source={profilePicture}
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