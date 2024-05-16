import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeLanding from '../components/HomeLanding'
import { StatusBar } from 'expo-status-bar'

const dummyData = [
  {
    id: 0,
    landing: true,
    incomplete: false,
    text: ""
  }, 
  {
    id: 1,
    landing: false,
    incomplete: false,
    text: "Testing 1"
  }, 
  {
    id: 2,
    landing: false,
    incomplete: false,
    text: "Testing 2"
  }, 
  {
    id: 3,
    landing: false,
    incomplete: false,
    text: "Testing 3"
  }, 
  {
    id: 4,
    landing: false,
    incomplete: false,
    text: "Testing 4"
  }, 
  {
    id: 5,
    landing: false,
    incomplete: false,
    text: "Testing 5"
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
        className="h-full border"
        data={dummyData}
        renderItem={({ item }) => {
          if (item.landing) {
            return (
              <HomeLanding 
                profile={dummyProfile}
              />
            )
          } else {
            return (
              <Text>{item.text}</Text>
            )
          }
        }}
      />

      <StatusBar style="light" />
    </View>
  )
}

export default Home