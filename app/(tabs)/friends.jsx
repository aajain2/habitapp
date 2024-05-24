import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import DismissKeyboard from '../../components/DismissKeyboard'
import BackButton from '../../components/buttons/BackButton'
import SearchBar from '../../components/search/SearchBar'
import { StatusBar } from 'expo-status-bar'
import TrabitHeader from '../../components/TrabitHeader'
import ProfileCard from '../../components/search/ProfileCard'

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

const FriendList = () => {
  return (
    <DismissKeyboard>
      <View>
        <SafeAreaView>
          <View className="h-full">
            <TrabitHeader />

            <BackButton 
              containerStyles="absolute pl-4 h-10 justify-center"
              handlePress={() => router.back()}
            />

            <SearchBar 
              containerStyles="mt-14 items-center"
              styles="bg-searchbar-gray"
            />

            <View className="w-full items-center">
              <View className="w-[90vw] my-4">
                <Text className="text-2xl font-inter-medium">Requests</Text>
              </View>

              <FlatList 
                className="h-60 w-[94vw] px-[2vw]"
                data={dummyData}
                renderItem={({ item }) => 
                  <TouchableOpacity activeOpacity={1}>
                    <ProfileCard
                      name={item.name}
                      username={item.username}
                      friendStatus={item.friends ? "friends" : item.requested ? "requested" : "add"}
                      handleAdd={() => {}}
                      handleRemoveFriend={() => {}}
                      profilePicture={item.profilePicture}
                      hasRemoveButton
                    />
                  </TouchableOpacity>
                }
                keyExtractor={(item) => item.id}
              />

              <View className="w-[90vw] my-4">
                <Text className="text-2xl font-inter-medium">Friends</Text>
              </View>

              <FlatList 
                className="h-60 w-[94vw] px-[2vw]"
                data={dummyData}
                renderItem={({ item }) => 
                  <TouchableOpacity activeOpacity={1}>
                    <ProfileCard
                      name={item.name}
                      username={item.username}
                      friendStatus={item.friends ? "friends" : item.requested ? "requested" : "add"}
                      handleAdd={() => {}}
                      handleRemoveFriend={() => {}}
                      profilePicture={item.profilePicture}
                      hasRemoveButton
                    />
                  </TouchableOpacity>
                }
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </SafeAreaView>

        <StatusBar style="dark" />
      </View>  
    </DismissKeyboard>
  )
}

export default FriendList