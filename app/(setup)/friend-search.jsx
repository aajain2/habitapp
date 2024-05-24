import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DismissKeyboard from '../../components/DismissKeyboard'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../../components/buttons/BackButton'
import { router } from 'expo-router'
import SearchBar from '../../components/search/SearchBar'

const FriendSearch = () => {
  return (
    <DismissKeyboard>
      <View>
        <SafeAreaView>
          <View className="h-full">
            <View className="absolute w-full h-10 justify-center">
              <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
            </View>

            <BackButton 
              containerStyles="absolute pl-4 h-10 justify-center"
              handlePress={() => router.back()}
            />

            <SearchBar 
              containerStyles="mt-14 items-center"
              styles="bg-searchbar-gray"
            />
          </View>
        </SafeAreaView>

        <StatusBar style="dark" />
      </View>  
    </DismissKeyboard>
  )
}

export default FriendSearch