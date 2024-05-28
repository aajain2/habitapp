import { View, Text, Image } from 'react-native'
import React from 'react'
import MenuButton from '../buttons/MenuButton'
import PictureCard from './PictureCard'

const PostCard = ({
  completed,
  post
}) => {
  return (
    <View className="mx-4 mb-6">
      <View className="flex-row gap-2 mb-3">
        <Image 
          className="w-10 h-10 rounded-full"
          source={{
            uri: post.profilePicture
          }}      
        />

        <View className="flex-grow">
          <Text className="text-sm font-inter-bold">{post.username}</Text>
          <Text className="text-xs font-inter-medium text-gray">Habit: {post.habit}</Text>
        </View>
        <View>
          <MenuButton 
            containerStyles="h-5"
            handleClick={() => console.log("Menu clicked")}
            size={16}
          />
          <Text className="text-xs font-inter-medium text-gray">{post.timestamp}</Text>
        </View>
      </View>

      <PictureCard 
        completed={completed}
        post={post}
      />
    </View>
  )
}

export default PostCard