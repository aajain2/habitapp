import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import TrabitHeader from '../../components/TrabitHeader'
import BackButton from '../../components/buttons/BackButton'
import { StatusBar } from 'expo-status-bar'

const Camera = () => {
  return (
    <SafeAreaView>
      <View className="h-full">
        <TrabitHeader />
        
        <BackButton 
          containerStyles="absolute pl-4 h-10 justify-center"
          handlePress={() => router.back()}
        />

        <View className="flex items-center justify-center h-full">
          <Text>Test</Text>
        </View>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default Camera