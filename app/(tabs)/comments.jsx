import { View, Text, SafeAreaView, FlatList, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileHeaderBar from '../../components/home/ProfileHeaderBar'
import DismissKeyboard from '../../components/DismissKeyboard'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams } from 'expo-router'
import CurrentPost from '../../components/home/CurrentPost'
import Comment from '../../components/Comment'
import AddCommentInput from '../../components/AddCommentInput'
import { getPost } from '../../functions/post'
import { convertFirebaseTimestamp } from '../../util/convertFirebaseTimestamp'
import { getCommentData } from '../../firebase/comments'

const Comments = () => {
  const { uid } = useLocalSearchParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    getPost(uid)
      .then((data) => {
        setPost(data)
        getCommentData(data.comments)
          .then((commentData) => {
            setComments(commentData)
          })
          .catch((e) => {
            Alert.alert(e.message)
          })
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }, [uid])

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY < 0) {
      Keyboard.dismiss();
    }
  };

  return (
    <DismissKeyboard>
      <>
        <FlatList 
          className="h-full"
          data={comments}
          ListEmptyComponent={() => {
            return (
              <View className="w-full items-center mt-8">
                <Text className="font-inter-bold text-base">
                  No comments yet
                </Text>
                <Text className="font-inter-regular text-sm">
                  Show your support!
                </Text>
              </View>
            )
          }}
          ListHeaderComponent={() => {
            return (
              <View className="h-[45vh] border-b border-light-gray/50">
                <SafeAreaView>
                  <View className="flex justify-center items-center">
                    <ProfileHeaderBar 
                      title={post?.username}
                      subtitle={post?.timestamp}
                    />
                    <Text className="text-base mt-2">
                      <Text className="font-inter-bold">Habit: </Text>
                      <Text className="font-inter-regular">{post?.habit}</Text>
                    </Text>

                    <Text className="text-base">
                      {post?.prompt}
                    </Text>

                    <CurrentPost 
                      postURI={post?.postURI}
                      hasLikes
                      likeCount={post?.likes}
                      likers={post?.likers}
                    />
                  </View>
                </SafeAreaView>
              </View>
            )
          }}
          renderItem={({ item }) => {
            return (
              <Comment 
                profilePicture={item.avatar}
                comment={item.comment}
                username={item.username}
                timestamp={convertFirebaseTimestamp(item.timestamp)}
              />
            )
          }}
          keyExtractor={(item, index) => index}
          onScroll={handleScroll}
        />

        <AddCommentInput 
          setComments={setComments}
          postId={post?.uid}
        />
        
        <StatusBar style="dark" />
      </>
    </DismissKeyboard>
  )
}

export default Comments