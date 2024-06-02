import { View, Text, Image } from 'react-native'
import React from 'react'
import gifs from '../constants/gifs'

const LandingPage = () => {
  return (
    <View className="absolute w-full h-full bg-background-gray flex items-center justify-center">
      <Image 
        className="w-44 h-44"
        source={gifs.rainbowRabbit}
        resizeMode="contain"
      />
    </View>
  )
}

export default LandingPage