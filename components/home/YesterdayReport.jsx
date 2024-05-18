import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

const dummyData = [
  {
    id: 0,
    name: "Joseph",
    username: "joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 1,
    name: "Kyle",
    username: "kylinator",
    profilePicture: "https://picsum.photos/200",
    friends : true,
    requested: false
  },
  {
    id: 2,
    name: "Meow",
    username: "arf",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 3,
    name: "Woof",
    username: "bowwow",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 4,
    name: "JosHulloeph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 5,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 6,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 7,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 8,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 9,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  }
]

const YesterdayReport = ({
  blurred
}) => {
  return (
    <View className="my-4 mx-4">
      <Text className="text-xl font-inter-bold">
        Yesterday’s Report
      </Text>
      <Text className="font-inter-bold">
        These people did not complete their habit.
      </Text>

      <FlatList 
        data={dummyData}
        className="py-4"
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => 
          <View className="mx-2">
            <Image 
              blurRadius={blurred ? 10 : 0}
              className="w-16 h-16 rounded-full"
              source={{
                uri: item.profilePicture
              }}
            />
            <Text className="text-center mt-2 text-xs font-inter-bold">
              {item.username}
            </Text>
          </View>
        }
      />
    </View>
  )
}

export default YesterdayReport