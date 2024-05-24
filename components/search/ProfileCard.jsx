import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AddFriendButton from '../buttons/AddFriendButton'
import ProfilePicture from '../ProfilePicture'
import { AntDesign } from '@expo/vector-icons'

const ProfileCard = ({
  name,
  username,
  profilePicture,
  handleAdd,
  friendStatus,
  hasRemoveButton,
  handleRemoveFriend
}) => {
  return (
    <View className="flex-row my-1">
      <ProfilePicture 
        source={profilePicture}
      />
      
      <View className="justify-center ml-2">
        <Text className="font-inter-medium text-sm">{name}</Text>
        <Text className="font-inter-regular text-xs">@{username}</Text>
      </View>
      <View className="ml-auto justify-center">
        <AddFriendButton friendStatus={friendStatus} handleAdd={handleAdd} />
      </View>

      {hasRemoveButton && 
        <TouchableOpacity 
          className="flex justify-center items-center ml-2"
          onPress={handleRemoveFriend}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      }
    </View>
  )
}

export default ProfileCard