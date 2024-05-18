import { View, Text } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av'
import videos from '../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context'

import HomeHeaderBar from './HomeHeaderBar'
import Countdown from './Countdown'
import Streak from './Streak'

const HomeLanding = ({
  profile
}) => {
  return (
    <View className="w-full h-[100vh]">
      <View className="absolute z-10 w-full h-[100vh]">
        <SafeAreaView>
          <HomeHeaderBar 
            profilePicture={profile.profilePicture}
          />

          <View className="flex-row mt-4">
            <Countdown 
              containerStyles="ml-4"
            />
            <Streak 
              containerStyles="flex-grow mr-4"
              days={10}
            />
          </View>

          
        </SafeAreaView>
      </View>

      <View className="z-0">
        <Video
          className="w-full h-full"
          source={videos.blueOrangeBackground}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          isMuted
          shouldPlay
        />
      </View>
      
    </View>
  )
}

export default HomeLanding