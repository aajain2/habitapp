import { View, Text } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context'

import HomeHeaderBar from './HomeHeaderBar'
import Countdown from './Countdown'
import Streak from './Streak'
import HabitPrompt from './HabitPrompt'

const HomeLanding = ({
  completed,
  profile,
  prompt
}) => {
  return (
    <View className={`w-full ${completed ? "h-[30vh]" : "h-[100vh]"}`}>
      <View className={`absolute z-10 w-full ${completed ? "h-[30vh]" : "h-[100vh]"}`}>
        <SafeAreaView>
          <View className="h-full flex justify-center">
            <View className="absolute w-full top-0">
              <HomeHeaderBar 
                profilePicture={profile.profilePicture}
              />
            </View>

            <View className={`flex-row mt-2 absolute top-14`}>
              <Countdown
                smaller={completed}
                completed={completed}
                containerStyles="ml-4"
              />
              <Streak
                smaller={completed}
                containerStyles="flex-grow mr-4"
                days={10}
              />
            </View>

            {completed ? 
              <View className="absolute bottom-0 w-full items-center">
                <Text className="text-white font-inter-bold text-lg">
                  You completed your habit today.
                </Text> 
              </View> : 
              <HabitPrompt 
                prompt={prompt}
              />
            }

            
          </View>
        </SafeAreaView>
      </View>

      <Video
        className="w-full h-full"
        source={completed ? videos.greenBackground : videos.blueOrangeBackground}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      />
    </View>
  )
}

export default HomeLanding