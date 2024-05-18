import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomLink from '../CustomLink'

const CurrentPost = ({
  picture
}) => {
  return (
    <View className="mt-6 flex justify-center items-center">
      <View>
        <Image
          className="w-28 h-40 rounded-lg"
          source={{
            uri: picture
          }}
          resizeMode="cover"
        />

        <CustomLink
          handlePress={() => console.log("Add comment")}
          containerStyles="mt-1"
          title="Add caption..."
          textStyles="text-light-gray text-xs font-inter-medium"
        />
      </View>
    </View>
  )
}

export default CurrentPost