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
import SignUpButton from '../../components/SignUpButton'
import { useQueryContext } from '../../context/QueryProvider'
import TrabitHeader from '../../components/TrabitHeader'

const FriendSetup = () => {
  const { setQuery } = useQueryContext()

  return (
    <DismissKeyboard>
      <View className="w-full h-full">
        <BackgroundVideo
          source={videos.blueOrangeBackground}
        />

        <SafeAreaView>
          <View>
            <TrabitHeader color="white" />

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
                seeMore
                containerStyles="h-64"
              />

              <SignUpButton 
                title="Next"
                containerStyles="bg-white/30 border-white mt-8"
                handlePress={() => {
                  setQuery("")
                  router.push("norm-setup")
                }}
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