import { View } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av';

const BackgroundVideo = ({
  source,
}) => {
  return (
    <View className="absolute w-full h-full z-0">
      <Video
        className="w-full h-full"
        source={source}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      />
    </View>
  )
}

export default BackgroundVideo