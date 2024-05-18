import { View, Text, FlatList } from 'react-native'
import React from 'react'
import HomeLanding from '../components/home/HomeLanding'
import { StatusBar } from 'expo-status-bar'
import YesterdayReport from '../components/home/YesterdayReport'
import PostCard from '../components/PostCard'

const dummyData = [
  {
    "id": 0,
    "username": "johnnyappleseed",
    "image": "https://picsum.photos/1080/1920",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Going to the gym everyday",
    "timestamp": "10:00"
  },
  {
    "id": 1,
    "username": "janedoe",
    "image": "https://picsum.photos/1080/1920",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Reading a book every night",
    "timestamp": "21:00"
  },
  {
    "id": 2,
    "username": "bobbuilder",
    "image": "https://picsum.photos/1080/1920",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Meditating every morning",
    "timestamp": "06:30"
  },
  {
    "id": 3,
    "username": "alicewonderland",
    "image": "https://picsum.photos/1080/1920",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Taking a walk after lunch",
    "timestamp": "13:00"
  },
  {
    "id": 4,
    "username": "charlietuna",
    "image": "https://picsum.photos/1080/1920",
    "profilePicture": "https://picsum.photos/200",
    "habit": "Journaling before bed",
    "timestamp": "22:30"
  }
]  


const dummyProfile = {
  username: "abe",
  firstName: "Abraham",
  lastName: "Lincoln",
  profilePicture: "https://picsum.photos/200"
}

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
                profile={dummyProfile}
              />

              <YesterdayReport 
                blurred={true}
              />

              <Text className="text-xl font-inter-bold ml-4">Today's Habit Complete</Text>
            </View>
          )
        }}
        renderItem={({ item }) => {
          return (
            <PostCard 
              username={item.username}
              image={item.image}
              profilePicture={item.profilePicture}
              habit={item.habit}
              timestamp={item.timestamp}
            />
          )
        }}
      />

      <StatusBar style="light" />
    </View>
  )
}

export default Home