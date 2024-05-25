import { View, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native'
import React, { useState } from 'react'
import TrabitHeader from '../../components/TrabitHeader'
import BackButton from '../../components/buttons/BackButton'
import { StatusBar } from 'expo-status-bar'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router'
import icons from '../../constants/icons'
import { AntDesign } from '@expo/vector-icons'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'

const Camera = () => {
  const [facing, setFacing] = useState("front")
  const [flash, setFlash] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()
  const [cameraReady, setCameraReady] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [photoURI, setPhotoURI] = useState("")

  const prompt = "Take a photo of any vegetable with a fork 🥦🍴"

  let camera

  const takePicture = async () => {
    let rawPhotoURI

    if (camera && cameraReady) {
      camera.takePictureAsync({ onPictureSaved: async (data) => {
        rawPhotoURI = data.uri

        const mirroredImage = await manipulateAsync(
          rawPhotoURI,
          [{ flip: FlipType.Horizontal }]
        )

        setPhotoURI(mirroredImage.uri)
        setPhotoTaken(true)
      }})      
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
          <Text className="font-inter-regular my-2">
            {prompt}
          </Text>

          <View className="w-[90vw] h-[60vh] rounded-2xl bg-light-gray flex items-center justify-center">
            {permission && !photoTaken && 
              <CameraView 
                facing={facing} 
                className="w-full h-full rounded-2xl overflow-hidden" 
                flash={flash ? "on" : "off"}
                onCameraReady={() => setCameraReady(true)}
                ref={(ref) => { camera = ref }}
              />
            }

            {photoTaken && 
              <>
                <Image 
                  source={{ uri: photoURI }}
                  className="w-full h-full rounded-2xl"
                />
              
                <TouchableOpacity 
                  className="absolute top-3 right-3 bg-black/50 p-1 rounded-full"
                  onPress={() => {
                    setPhotoTaken(false)
                    setPhotoURI("")
                  }}
                >
                  <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
              </>
            }            
          </View>

          <View className="flex-row justify-center items-center w-full h-24 gap-x-8 mt-8">
            {!photoTaken ? 
              <>
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
              </>
            : 
              <TouchableOpacity 
                className="flex-row justify-center items-center gap-x-4"
                onPress={() => {
                  router.navigate("/home")
                }}
              >
                <Text className="text-lg font-inter-bold">COMPLETE HABIT</Text>
                <Image
                  className="w-6 h-6"
                  resizeMode="contain"
                  source={icons.sendIcon}
                />
              </TouchableOpacity>
              
            }
          </View>
        </View>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default Camera