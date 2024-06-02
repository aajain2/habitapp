import { useEffect, useState } from 'react'
import { View, Image, Text, Alert } from 'react-native'
import { getAvatars } from '../../firebase/avatar'

const CurrentPost = ({
  postURI,
  containerStyles,
  hasLikes,
  likeCount,
  likers
}) => {
  const [avatars, setAvatars] = useState([])

  useEffect(() => {
    if (hasLikes && likers) {
      const firstThree = getFirstThreeLikers(likers)

      getAvatars(firstThree)
        .then((avatars) => {
          setAvatars(avatars)
        })
        .catch((e) => {
          Alert.alert(e.message)
        })
    }
  }, [likers])

  const getFirstThreeLikers = (likers) => {
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
            {avatars?.map((item, index) => {
              return (
                <Image
                  className="w-6 h-6 rounded-full border-2 border-background-gray -mr-2"
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