import { View, Text } from 'react-native'
import React from 'react'
import DismissKeyboard from '../../components/DismissKeyboard'
import BackgroundVideo from '../../components/BackgroundVideo'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/buttons/BackButton'
import CustomButton from '../../components/buttons/CustomButton'
import { router } from 'expo-router'
import TrabitHeader from '../../components/TrabitHeader'
import { StatusBar } from 'expo-status-bar'

const NormSetup = () => {
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
                <Text className="text-white font-inter-bold text-lg">Norms</Text>
                <Text className="text-white font-inter-regular text-xs w-52 text-center">WIP</Text>
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
    </DismissKeyboard>
  )
}

export default NormSetup