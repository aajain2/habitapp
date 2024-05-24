import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrabitHeader from '../../components/TrabitHeader'
import BackButton from '../../components/buttons/BackButton'
import { StatusBar } from 'expo-status-bar'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router'

const Camera = () => {
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();

  // useEffect(() => {
  //   if (!permission.granted) {
  //     requestPermission()
  //   }
  // }, [permission])

  return (
    <SafeAreaView>
      <View className="h-full">
        <TrabitHeader />
        
        <BackButton 
          containerStyles="absolute pl-4 h-10 justify-center"
          handlePress={() => router.back()}
        />

        <View className="flex items-center justify-center h-full">
          <View className="w-[90vw] h-[60vh] rounded-2xl bg-light-gray">
            {permission && 
              <CameraView facing={facing} className="w-full h-full rounded-2xl overflow-hidden"></CameraView>
            }
          </View>
        </View>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default Camera