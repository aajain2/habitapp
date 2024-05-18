import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeLanding from '../components/home/HomeLanding'
import { StatusBar } from 'expo-status-bar'
import YesterdayReport from '../components/home/YesterdayReport'

const dummyData = [
  {
    id: 0,
    landing: false,
    report: false,
    text: "Testing 1"
  }, 
  {
    id: 1,
    landing: false,
    report: false,
    text: "Testing 2"
  }, 
  {
    id: 2,
    landing: false,
    report: false,
    text: "Testing 3"
  }, 
  {
    id: 3,
    landing: false,
    report: false,
    text: "Testing 4"
  },
  {
    id: 4,
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

              <Text className="text-xl font-inter-bold ml-4 mb-4">Today's Habit Complete</Text>
            </View>
          )
        }}
        renderItem={({ item }) => {
          return (
            <Text>{item.text}</Text>
          )
        }}
      />

      <StatusBar style="light" />
    </View>
  )
}

export default Home