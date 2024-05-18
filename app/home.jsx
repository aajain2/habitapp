import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeLanding from '../components/HomeLanding'
import { StatusBar } from 'expo-status-bar'
import YesterdayReport from '../components/YesterdayReport'

const dummyData = [
  {
    id: 0,
    landing: true,
    report: false,
    text: ""
  }, 
  {
    id: 1,
    landing: false,
    report: true,
    text: ""
  }, 
  {
    id: 2,
    landing: false,
    report: false,
    text: "Testing 1"
  }, 
  {
    id: 3,
    landing: false,
    report: false,
    text: "Testing 2"
  }, 
  {
    id: 4,
    landing: false,
    report: false,
    text: "Testing 3"
  }, 
  {
    id: 5,
    landing: false,
    report: false,
    text: "Testing 4"
  },
  {
    id: 6,
    landing: false,
    report: false,
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
          } else if (item.report) {
            return (
              <YesterdayReport />
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