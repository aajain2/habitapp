import { View } from 'react-native'
import React from 'react'
import BackgroundVideo from '../../components/BackgroundVideo'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/buttons/BackButton'
import CustomButton from '../../components/buttons/CustomButton'
import { router } from 'expo-router'
import TrabitHeader from '../../components/TrabitHeader'
import { StatusBar } from 'expo-status-bar'
import NormText from '../../components/NormText'

const NormSetup = () => {
  return (
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

          <View className="flex items-center justify-center h-full w-full">
            <View className="w-[92vw] h-[60vh]">
              <View className="flex-1">
                <NormText 
                  containerStyles="px-2"
                />
              </View>
            </View>

            <CustomButton 
              title="Next"
              containerStyles="bg-white/30 border-white mt-8"
              handlePress={() => router.replace("home")}
            />
          </View>
        </View>
      </SafeAreaView>

      <StatusBar style="light" />
    </View>
  )
}

export default NormSetup