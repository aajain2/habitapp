import { View, Text, SafeAreaView, FlatList, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import ProfileHeaderBar from '../../components/home/ProfileHeaderBar'
import DismissKeyboard from '../../components/DismissKeyboard'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams } from 'expo-router'
import CurrentPost from '../../components/home/CurrentPost'
import Comment from '../../components/Comment'

const dummyComments = [
  {
    id: 0,
    username: "johnnyappleseed",
    comment: "nice gains bro",
    profilePicture: "https://picsum.photos/200",
  },
  {
    id: 1,
    username: "techguru99",
    comment: "This is really insightful, thank you!",
    profilePicture: "https://picsum.photos/200?random=1",
  },
  {
    id: 2,
    username: "naturelover",
    comment: "Beautiful pictures! Where were they taken?",
    profilePicture: "https://picsum.photos/200?random=2",
  },
  {
    id: 3,
    username: "foodie123",
    comment: "Yum, that recipe looks delicious. Can't wait to try it!",
    profilePicture: "https://picsum.photos/200?random=3",
  },
  {
    id: 4,
    username: "bookworm",
    comment: "Amazing book review, added to my reading list.",
    profilePicture: "https://picsum.photos/200?random=4",
  },
  {
    id: 5,
    username: "travelbug",
    comment: "Such a fantastic travel guide, it’s very helpful.",
    profilePicture: "https://picsum.photos/200?random=5",
  },
  {
    id: 6,
    username: "gamerzrule",
    comment: "Great gameplay tips, really helped me out!",
    profilePicture: "https://picsum.photos/200?random=6",
  },
  {
    id: 7,
    username: "fitnessfreak",
    comment: "Awesome workout routine, thanks for sharing!",
    profilePicture: "https://picsum.photos/200?random=7",
  },
  {
    id: 8,
    username: "musiclover",
    comment: "Loved this song, thanks for recommending it!",
    profilePicture: "https://picsum.photos/200?random=8",
  },
  {
    id: 9,
    username: "moviebuff",
    comment: "Fantastic movie review, definitely going to watch it.",
    profilePicture: "https://picsum.photos/200?random=9",
  }
]

const Comments = () => {
  const post = useLocalSearchParams()

  return (
    <DismissKeyboard>
      <>
        <FlatList 
          className="h-full"
          data={dummyComments}
          ListHeaderComponent={() => {
            return (
              <View className="h-[45vh] border-b border-light-gray/50">
                <SafeAreaView>
                  <View className="flex justify-center items-center">
                    <ProfileHeaderBar 
                      title={post.username}
                      subtitle={post.timestamp}
                    />
                    <Text className="text-base mt-2">
                      <Text className="font-inter-bold">Habit: </Text>
                      <Text className="font-inter-regular">{post.habit}</Text>
                    </Text>

                    <Text className="text-base">
                      {post.prompt}
                    </Text>

                    <CurrentPost 
                      picture={post.image}
                      hasLikes
                      likeCount={post.likeCount}
                      likers={post.likers.split(",")}
                    />
                  </View>
                </SafeAreaView>
              </View>
            )
          }}
          renderItem={({ item }) => {
            return (
              <Comment 
                profilePicture={item.profilePicture}
                comment={item.comment}
                username={item.username}
              />
            )
          }}
          keyExtractor={(item) => item.id}
        />

        <KeyboardAvoidingView behavior="padding">
          <SafeAreaView>
              <View className="border-t border-light-gray/50">
                <TextInput 
                  className="font-inter-regular p-4" 
                  placeholder="Add a comment..."
                  placeholderTextColor="text-light-gray"
                />
              </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
        
        <StatusBar style="dark" />
      </>
    </DismissKeyboard>
  )
}

export default Comments