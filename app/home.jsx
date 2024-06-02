import { View, Text, FlatList, Alert } from 'react-native'
import HomeLanding from '../components/home/HomeLanding'
import { StatusBar } from 'expo-status-bar'
import YesterdayReport from '../components/home/YesterdayReport'
import PostCard from '../components/home/PostCard'
import CurrentPost from '../components/home/CurrentPost'
import { useGlobalContext } from '../context/GlobalProvider'
import { useEffect, useState } from 'react'
import { getFriendsPosts, getPost } from '../functions/post'
import EmptyResults from '../components/search/EmptyResults'

const Home = () => {
  const { user, refreshUser, loading, setLoading } = useGlobalContext()
  const [currentPost, setCurrentPost] = useState(null)
  const [friendsPosts, setFriendsPosts] = useState([])

  useEffect(() => {
    if (user.completedToday) {
      getPost(user.uid)
        .then((post) => {
          setCurrentPost(post)
        })
        .catch((e) => {
          Alert.alert(e.message)
        })
    }
  }, [user])

  useEffect(() => {
    getFriendsPosts(user.friends)
      .then((posts) => {
        setFriendsPosts(posts)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }, [])

  const handleRefresh = async () => {
    setLoading(true)

    try {
      if (user.completedToday) {
        const userPost = await getPost(user.uid)
        setCurrentPost(userPost)
      }

      await refreshUser()

      const friendsPosts = await getFriendsPosts(user.friends)
      setFriendsPosts(friendsPosts)

      setLoading(false)
    } catch (e) {
      Alert.alert(e.message)
    }
  }

  return (
    <View className="w-full h-full">
      <FlatList 
        className="h-full"
        data={friendsPosts}
        refreshing={loading}
        onRefresh={handleRefresh}
        ListHeaderComponent={() => {
          return (
            <View>
              <HomeLanding />

              {user.completedToday && 
                <CurrentPost
                  containerStyles="items-center"
                  postURI={currentPost?.postURI}
                />
              }
              
              <YesterdayReport 
                blurred={!user.completedToday}
              />

              <Text className="text-xl font-inter-bold ml-4 mb-4">Today's Habit Complete</Text>
            </View>
          )
        }}
        renderItem={({ item }) => {
          return (
            <PostCard 
              completed={user.completedToday}
              post={item}
            />
          )
        }}
        keyExtractor={(item) => item.uid}
        ListEmptyComponent={() => {
          return (
            <View className="flex justify-center items-center mb-8">
              <View className="w-[90vw] h-[20vh] flex justify-center items-center">
                <EmptyResults 
                  message="None of your friends have completed their habits yet"
                  textStyles="w-44 mt-2"
                />
              </View>
            </View>
          )
        }}
      />

      <StatusBar style="light" />
    </View>
  )
}

export default Home