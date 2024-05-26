import { View, Image, Text } from 'react-native'
import React from 'react'

const CurrentPost = ({
  containerStyles,
  picture,
  hasLikes,
  likeCount,
  likers
}) => {
  const getFirstThreeLikers = (likers) => {
    return likers.slice(0, 3);
  }

  return (
    <View className={`mt-6 ${containerStyles}`}>
      <Image
        className="w-28 h-40 rounded-lg"
        source={{
          uri: picture
        }}
        resizeMode="cover"
      />

      {hasLikes && 
        <View className="flex-row mt-2 items-center">
          <View className="flex-row">
            {getFirstThreeLikers(likers).map((item) => {
              return (
                <Image
                  className="w-6 h-6 rounded-full border-2 border-[#F2F2F2] -mr-2"
                  source={{
                    uri: item
                  }}
                  resizeMode="contain"
                />
              )
            })}
          </View>

          <Text className="font-inter-medium text-gray text-sm ml-auto">
            {likeCount} Likes
          </Text>
        </View>
      }
    </View>
  )
}

export default CurrentPost