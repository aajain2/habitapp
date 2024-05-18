import { View } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context'

import HomeHeaderBar from './HomeHeaderBar'
import Countdown from './Countdown'
import Streak from './Streak'
import HabitPrompt from './HabitPrompt'

const HomeLanding = ({
  profile,
  prompt
}) => {
  return (
    <View className="w-full h-[100vh]">
      <View className="absolute z-10 w-full h-[100vh]">
        <SafeAreaView>
          <View className="h-full flex justify-center">
            <View className="absolute w-full top-0">
              <HomeHeaderBar 
                profilePicture={profile.profilePicture}
              />
            </View>

            <View className="flex-row mt-2 absolute top-14">
              <Countdown 
                containerStyles="ml-4"
              />
              <Streak 
                containerStyles="flex-grow mr-4"
                days={10}
              />
            </View>

            <HabitPrompt 
              prompt={prompt}
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