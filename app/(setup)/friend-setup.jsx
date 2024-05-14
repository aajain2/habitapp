import { View, Text } from 'react-native'
import React from 'react'
import BackgroundVideo from '../../components/BackgroundVideo'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../../components/search/SearchBar'
import DismissKeyboard from '../../components/DismissKeyboard'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../../components/BackButton'
import { router } from 'expo-router'

const FriendSetup = () => {
  return (
    <DismissKeyboard>
      <View className="w-full h-full">
        <BackgroundVideo
          source={videos.blueOrangeBackground}
        />

        <SafeAreaView>
          <View>
            <View className="absolute w-full h-10 justify-center z-10">
              <Text className="text-3xl text-white font-alata-regular text-center">TRABIT</Text>
            </View>

            <BackButton 
              containerStyles="absolute pl-4 h-10 justify-center"
              handlePress={() => router.back()}
              iconColor="white"
            />

            <View className="flex items-center justify-center h-full">
              <View className="h-20 flex items-center">
                <Text className="text-white font-inter-bold text-lg">Let’s add some friends now</Text>
                <Text className="text-white font-inter-regular text-xs w-52 text-center">Search up your friends’ names or usernames</Text>
              </View>

              <SearchBar 
                placeholder="Search by username"
              />
            </View>
          </View>
        </SafeAreaView>

        <StatusBar style="light" />
      </View>
    </DismissKeyboard>
  )
}

export default FriendSetup