import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import MenuButton from '../buttons/MenuButton'
import PictureCard from './PictureCard'
import ReportModal from '../ReportModal'

const PostCard = ({
  completed,
  post
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <View className="mx-4 mb-6">
      <ReportModal 
        showModal={showModal} 
        setShowModal={setShowModal}
        postId={post.uid}
      />

      <View className="flex-row gap-2 mb-3">
        <Image 
          className="w-10 h-10 rounded-full"
          source={{
            uri: post.avatar
          }}      
        />

        <View className="flex-grow">
          <Text className="text-sm font-inter-bold">{post.username}</Text>
          <Text className="text-xs font-inter-medium text-gray">Habit: {post.habit}</Text>
        </View>
        <View>
          <MenuButton 
            containerStyles="h-5"
            handleClick={() => setShowModal(true)}
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