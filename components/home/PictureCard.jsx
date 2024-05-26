import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from '../buttons/CustomButton'
import CustomLink from '../CustomLink'
import { router } from 'expo-router'
import LikeButton from '../buttons/LikeButton'

const PictureCard = ({
  prompt,
  image,
  completed,
  caption,
  liked,
  likeCount
}) => {
  return (
    <View>
      <View className="w-full h-[60vh] flex justify-center">
        <Image
          blurRadius={completed ? 0 : 75}
          className="w-full h-[60vh] rounded-xl absolute"
          resizeMode="cover"
          source={{
            uri: image
          }}
        />

        {completed && 
          <View className="absolute bottom-2 w-full flex-row items-end">
            <Text className="text-white font-inter-regular ml-4">{caption}</Text>
            <LikeButton
              containerStyles="ml-auto mr-4"
              likeCount={likeCount}
              liked={liked}
              handlePress={() => {}}
            />
          </View>
        }

        {!completed &&
          <View className="items-center">
            <Text className="text-base font-inter-bold text-white mb-4">
              Complete your habit today.
            </Text>

            <CustomButton
              containerStyles="bg-transparent border-white border w-64 h-16 px-4 mb-4 rounded-xl"
              textStyles="text-white font-inter-regular text-center"
              title={prompt}
              handlePress={() => router.navigate("/camera")}
            />

            <Text className="text-center text-sm font-inter-regular text-white w-56 mb-4">
              To view your friends’ completed habit, you must post yours first.
            </Text>

            <CustomButton
              containerStyles="w-36 h-8 border-transparent bg-dark-blue "
              textStyles="text-xs text-white font-inter-regular"
              title="Complete Habit."
              handlePress={() => router.navigate("/camera")}
            />
          </View>
        }
      </View>

      <View className="mt-2 h-5">
        {completed && 
          <CustomLink
            handlePress={() => router.navigate("/comments")}
            containerStyles=""
            title="Add comment..."
            textStyles="text-light-gray font-inter-medium"
          />
        }
      </View>
    </View>
  )
}

export default PictureCard