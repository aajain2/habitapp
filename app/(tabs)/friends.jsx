import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import DismissKeyboard from '../../components/DismissKeyboard'
import BackButton from '../../components/buttons/BackButton'
import SearchBar from '../../components/search/SearchBar'
import { StatusBar } from 'expo-status-bar'
import TrabitHeader from '../../components/TrabitHeader'
import ProfileCard from '../../components/search/ProfileCard'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getFriendData } from '../../functions/friends'

const FriendList = () => {
  const { user } = useGlobalContext()
  const [friends, setFriends] = useState([])
  const [incomingRequests, setIncomingRequests] = useState([])

  useEffect(() => {
    getFriendData(user.friends)
      .then((data) => {
        setFriends(data)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }, [])

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
                data={incomingRequests}
                renderItem={({ item }) => 
                  <TouchableOpacity activeOpacity={1}>
                    <ProfileCard
                      isAcceptRequestCard
                      accepted={item.accepted}
                      name={item.name}
                      username={item.username}
                      handleAcceptFriend={() => {}}
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
                data={friends}
                renderItem={({ item }) => 
                  <TouchableOpacity activeOpacity={1}>
                    <ProfileCard
                      name={`${item.firstName} ${item.lastName}`}
                      username={item.username}
                      handleRemoveFriend={() => {}}
                      profilePicture={item.avatar}
                      hasRemoveButton
                      hideActionButton
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