import { Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import icons from '../../constants/icons'
import { likePost, unlikePost } from '../../firebase/like'
import { useGlobalContext } from '../../context/GlobalProvider'

const LikeButton = ({
  containerStyles,
  post
}) => {
  const { user } = useGlobalContext()
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    if (post.likers.includes(user.uid)) {
      setLiked(true)
    } else {
      setLiked(false)
    }

    setLikes(post.likes)
  }, [user])

  const handlePress = () => {
    if (!liked) {
      likePost(post.uid)
        .then(() => {
          setLiked(true)
          setLikes(likes + 1)
        })
        .catch((e) => {
          Alert.alert(e.message)
        })
    } else if (liked) {
      unlikePost(post.uid)
        .then(() => {
          setLiked(false)
          setLikes(likes - 1)
        })
        .catch((e) => {
          Alert.alert(e.message)
        })
    }
  }

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
      <Text className="font-inter-bold text-white text-xs">{likes}</Text>
    </TouchableOpacity>
  )
}

export default LikeButton