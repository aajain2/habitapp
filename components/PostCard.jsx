import { View, Text, Image } from 'react-native'
import React from 'react'

const PostCard = ({
  username,
  image,
  profilePicture,
  habit,
  timestamp
}) => {
  return (
    <View className="mx-4 my-4">
      <View className="flex-row gap-2">
        <Image 
          className="w-10 h-10 rounded-full"
          source={{
            uri: profilePicture
          }}      
        />

        <View className="flex-grow">
          <Text className="text-sm font-inter-bold">{username}</Text>
          <Text className="text-xs font-inter-medium text-gray">Habit: {habit}</Text>
        </View>
        <View>
          <Text>{timestamp}</Text>
        </View>
      </View>
    </View>
  )
}

export default PostCard