import { View, Text, FlatList } from 'react-native'
import React from 'react'
import HomeLanding from '../components/home/HomeLanding'
import { StatusBar } from 'expo-status-bar'
import YesterdayReport from '../components/home/YesterdayReport'
import PostCard from '../components/home/PostCard'
import CurrentPost from '../components/home/CurrentPost'

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

const dummyProfile = {
  username: "abe",
  firstName: "Abraham",
  lastName: "Lincoln",
  profilePicture: "https://picsum.photos/200"
}

const completed = true

const Home = () => {
  return (
    <View className="w-full h-full">
      <FlatList 
        className="h-full"
        data={dummyData}
        ListHeaderComponent={() => {
          return (
            <View>
              <HomeLanding
                completed={completed}
                prompt={prompt}
                profile={dummyProfile}
              />

              {completed && 
                <CurrentPost
                  containerStyles="items-center"
                  picture="https://picsum.photos/540/720"
                />
              }
              
              <YesterdayReport 
                blurred={!completed}
              />

              <Text className="text-xl font-inter-bold ml-4 mb-4">Today's Habit Complete</Text>
            </View>
          )
        }}
        renderItem={({ item }) => {
          return (
            <PostCard 
              completed={completed}
              post={item}
            />
          )
        }}
        keyExtractor={(item) => item.key}
      />

      <StatusBar style="light" />
    </View>
  )
}

export default Home