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
    "image": "https://picsum.photos/1080/1440",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Going to the gym everyday",
    "timestamp": "10:00",
    "caption": "lets get these gains",
    "liked": false,
    "likeCount": 5
  },
  {
    "id": 1,
    "username": "janedoe",
    "image": "https://picsum.photos/1080/1440",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Reading a book every night",
    "timestamp": "21:00",
    "caption": "",
    "liked": true,
    "likeCount": 2
  },
  {
    "id": 2,
    "username": "bobbuilder",
    "image": "https://picsum.photos/1080/1440",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Meditating every morning",
    "timestamp": "06:30",
    "caption": "meditating",
    "liked": true,
    "likeCount": 19
  },
  {
    "id": 3,
    "username": "alicewonderland",
    "image": "https://picsum.photos/1080/1440",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Taking a walk after lunch",
    "timestamp": "13:00",
    "caption": "",
    "liked": false,
    "likeCount": 0
  },
  {
    "id": 4,
    "username": "charlietuna",
    "image": "https://picsum.photos/1080/1440",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Journaling before bed",
    "timestamp": "22:30",
    "caption": "",
    "liked": true,
    "likeCount": 1
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
              username={item.username}
              image={item.image}
              profilePicture={item.profilePicture}
              habit={item.habit}
              timestamp={item.timestamp}
              prompt={prompt}
              caption={item.caption}
              liked={item.liked}
              likeCount={item.likeCount}
            />
          )
        }}
      />

      <StatusBar style="light" />
    </View>
  )
}

export default Home