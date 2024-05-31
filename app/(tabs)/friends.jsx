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
import { getFriendData, removeFriend, removeFriendRequest } from '../../firebase/friends'
import { removeElementByValue } from '../../util/removeElementByValue'

const FriendList = () => {
  const { user, setUser } = useGlobalContext()
  const [friends, setFriends] = useState([])
  const [incomingRequests, setIncomingRequests] = useState([])

  useEffect(() => {
    // Set current friends
    getFriendData(user.friends)
      .then((data) => {
        setFriends(data)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })

    // Set incoming requests
    getFriendData(user.incomingRequests)
      .then((data) => {
        setIncomingRequests(data)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }, [])

  const handleRemoveFriend = (userUID, friendUID) => {
    removeFriend(userUID, friendUID)
      .then(() => {
        const newFriendArray = removeElementByValue(user.friends, friendUID)
        setUser({
          ...user,
          friends: newFriendArray
        })

        const newFriends = friends.filter((friend) => friend.uid !== friendUID)
        setFriends(newFriends)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }

  const handleRemoveRequest = (userUID, friendUID) => {
    removeFriendRequest(userUID, friendUID)
      .then(() => {
        const newIncomingRequestArray = removeElementByValue(user.friends, friendUID)
        setUser({
          ...user,
          incomingRequests: newIncomingRequestArray
        })

        const newIncomingRequests = incomingRequests.filter((friend) => friend.uid !== friendUID)
        setIncomingRequests(newIncomingRequests)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }

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
                      firstName={item.firstName}
                      lastName={item.lastName}
                      username={item.username}
                      profilePicture={item.avatar}
                      handleRemoveRequest={handleRemoveRequest}
                      hasRemoveButton
                      uid={item.uid}
                    />
                  </TouchableOpacity>
                }
                keyExtractor={(item) => item.uid}
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
                      firstName={item.firstName}
                      lastName={item.lastName}
                      username={item.username}
                      handleRemoveFriend={handleRemoveFriend}
                      profilePicture={item.avatar}
                      hasRemoveButton
                      hideActionButton
                      uid={item.uid}
                    />
                  </TouchableOpacity>
                }
                keyExtractor={(item) => item.uid}
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