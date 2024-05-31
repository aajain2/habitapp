import { View, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const CurrentPost = ({
  postURI,
  containerStyles,
  hasLikes,
  likeCount,
  likers
}) => {
  const getFirstThreeLikers = (likers) => {
    if (likers[0] === "") {
      return [];
    }

    if (likers.length < 3) {
      return likers
    }

    return likers.slice(0, 3);
  }

  return (
    <View className={`mt-6 ${containerStyles}`}>
      <Image
        className="w-28 h-40 rounded-lg"
        source={{
          uri: postURI
        }}
        resizeMode="cover"
      />

      {hasLikes && 
        <View className="flex-row mt-2 items-center">
          <View className="flex-row">
            {getFirstThreeLikers(likers).map((item, index) => {
              return (
                <Image
                  className="w-6 h-6 rounded-full border-2 border-[#F2F2F2] -mr-2"
                  source={{
                    uri: item
                  }}
                  resizeMode="contain"
                  key={index}
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