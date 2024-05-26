import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'

const LikeButton = ({
  containerStyles,
  liked,
  handlePress,
  likeCount,
}) => {
  return (
    <TouchableOpacity 
      className={`flex items-center justify-center ${containerStyles}`}
      onPress={handlePress}
    >
      <Image
        className="w-9 h-9 mb-1" 
        source={liked ? icons.heartFull : icons.heartEmpty}
        resizeMode="contain"
      />
      <Text className="font-inter-bold text-white text-xs">{likeCount}</Text>
    </TouchableOpacity>
  )
}

export default LikeButton