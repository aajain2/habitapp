import { View, Text, FlatList, Alert } from 'react-native'
import HomeLanding from '../components/home/HomeLanding'
import { StatusBar } from 'expo-status-bar'
import YesterdayReport from '../components/home/YesterdayReport'
import PostCard from '../components/home/PostCard'
import CurrentPost from '../components/home/CurrentPost'
import { useGlobalContext } from '../context/GlobalProvider'
import { useEffect, useState } from 'react'
import { getFriendsPosts, getPost } from '../functions/post'

const dummyData = [
  {
    "id": 0,
    "username": "johnnyappleseed",
    "image": "https://picsum.photos/1080/1440?random=0",
    "profilePicture": "https://picsum.photos/200?random=0",
    "habit": "Going to the gym everyday",
    "prompt": "Take a picture of you at the gym",
    "timestamp": "10:00",
    "liked": false,
    "likeCount": 5,
    "likers": [
      "https://picsum.photos/200?random=0",
      "https://picsum.photos/200?random=1",
      "https://picsum.photos/200?random=2",
      "https://picsum.photos/200?random=3"
    ]
  },
  {
    "id": 1,
    "username": "janedoe",
    "image": "https://picsum.photos/1080/1440?random=1",
    "profilePicture": "https://picsum.photos/200?random=1",
    "habit": "Reading a book every night",
    "prompt": "Take a picture of you holding your book",
    "timestamp": "21:00",
    "liked": true,
    "likeCount": 2,
    "likers": [
      "https://picsum.photos/200?random=0",
      "https://picsum.photos/200?random=1"
    ]
  },
  {
    "id": 2,
    "username": "bobbuilder",
    "image": "https://picsum.photos/1080/1440?random=2",
    "profilePicture": "https://picsum.photos/200?random=2",
    "habit": "Meditating every morning",
    "prompt": "Take a picture of you on the ground",
    "timestamp": "06:30",
    "liked": true,
    "likeCount": 19,
    "likers": [
      "https://picsum.photos/200?random=0",
      "https://picsum.photos/200?random=1",
      "https://picsum.photos/200?random=2",
      "https://picsum.photos/200?random=3"
    ]
  },
  {
    "id": 3,
    "username": "alicewonderland",
    "image": "https://picsum.photos/1080/1440?random=3",
    "profilePicture": "https://picsum.photos/200?random=3",
    "habit": "Taking a walk after lunch",
    "prompt": "This a picture of you walking",
    "timestamp": "13:00",
    "liked": false,
    "likeCount": 0,
    "likers": []
  },
  {
    "id": 4,
    "username": "charlietuna",
    "image": "https://picsum.photos/1080/1440?random=4",
    "profilePicture": "https://picsum.photos/200?random=4",
    "habit": "Journaling before bed",
    "prompt": "Take a picture of you in bed",
    "timestamp": "22:30",
    "liked": true,
    "likeCount": 1,
    "likers": [
      "https://picsum.photos/200?random=0"
    ]
  }
]  

const prompt = "Take a photo of any vegetable with a fork 🥦🍴"

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
        console.log(posts)
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
              <HomeLanding
                prompt={prompt}
              />

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