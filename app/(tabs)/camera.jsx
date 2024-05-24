import { View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import TrabitHeader from '../../components/TrabitHeader'
import BackButton from '../../components/buttons/BackButton'
import { StatusBar } from 'expo-status-bar'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router'
import icons from '../../constants/icons'

const Camera = () => {
  const [facing, setFacing] = useState("front")
  const [flash, setFlash] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()
  const [cameraReady, setCameraReady] = useState(false)

  let camera

  const takePicture = async () => {
    if (camera && cameraReady) {
      camera.takePictureAsync({ onPictureSaved: (data) => console.log(data) });
    }
  }

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
              <CameraView 
                facing={facing} 
                className="w-full h-full rounded-2xl overflow-hidden" 
                flash={flash ? "on" : "off"}
                onCameraReady={() => setCameraReady(true)}
                ref={(ref) => { camera = ref }}
              />
            }
          </View>

          <View className="flex-row justify-center items-center w-[90vw] gap-x-8 mt-8">
            <TouchableOpacity onPress={() => setFlash(!flash)}>
              <Image 
                className="w-14 h-14"
                source={flash ? icons.flashOn : icons.flashOff}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity 
              className="w-24 h-24 border-[10px] rounded-full"
              onPress={() => takePicture()}
            />

            <TouchableOpacity 
              onPress={() => {
                if (facing === "front") {
                  setFacing("back")
                } else {
                  setFacing("front")
                }
              }}
            >
              <Image 
                className="w-14 h-14"
                source={icons.cameraFlip}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default Camera