import { View, Text, Image } from 'react-native'
import React from 'react'
import MenuButton from '../buttons/MenuButton'
import PictureCard from './PictureCard'

const PostCard = ({
  completed,
  username,
  image,
  profilePicture,
  habit,
  timestamp,
  prompt,
  caption
}) => {
  return (
    <View className="mx-4 mb-6">
      <View className="flex-row gap-2 mb-3">
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
          <MenuButton 
            containerStyles="h-5"
            handleClick={() => console.log("Menu clicked")}
            size={16}
          />
          <Text className="text-xs font-inter-medium text-gray">{timestamp}</Text>
        </View>
      </View>

      <PictureCard 
        caption={caption}
        completed={completed}
        prompt={prompt}
        image={image}
      />
    </View>
  )
}

export default PostCard