import { View, Text, Image } from 'react-native'
import React from 'react'

const Comment = ({
  profilePicture,
  comment,
  username,
  timestamp,
}) => {
  return (
    <View className="w-full flex items-center justify-center my-2">
      <View className="flex-row w-[90vw]">
        <Image
          className="w-10 h-10 rounded-full"
          source={{
            uri: profilePicture
          }}
          resizeMode="contain"
        />

        <View className="ml-2 w-72">
          <View className="flex-row items-center">
            <Text className="font-inter-bold text-sm">
              {username}
            </Text>

            <Text className="text-sm font-inter-regular text-gray ml-auto">{timestamp}</Text>
          </View>

          <Text className="font-inter-regular text-sm">
            {comment}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Comment