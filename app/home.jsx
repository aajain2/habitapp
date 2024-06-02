import { View, Text, FlatList, Alert } from 'react-native'
import HomeLanding from '../components/home/HomeLanding'
import { StatusBar } from 'expo-status-bar'
import YesterdayReport from '../components/home/YesterdayReport'
import PostCard from '../components/home/PostCard'
import CurrentPost from '../components/home/CurrentPost'
import { useGlobalContext } from '../context/GlobalProvider'
import { useEffect, useState } from 'react'
import { getFriendsPosts, getPost } from '../functions/post'

const Home = () => {
  const { user } = useGlobalContext()
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
  

  return (
    <View className="w-full h-full">
      <FlatList 
        className="h-full"
        data={friendsPosts}
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
      />

      <StatusBar style="light" />
    </View>
  )
}

export default Home