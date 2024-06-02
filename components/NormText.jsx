import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import images from '../constants/images'

const NormText = ({
  containerStyles
}) => {
  return (
    <ScrollView 
      className={`${containerStyles}`}
    >
      <Text className="text-white font-inter-bold text-lg mb-4 text-center">How TRABIT Works</Text>

      <Text className="font-inter-bold text-white text-base mb-4">
        You have 24 hours to complete your habit
      </Text>

      <Text className="font-inter-bold text-white text-base">
        How?
      </Text>

      <Text className="font-inter-regular text-white text-base mb-4">
        Post a picture to the prompt before the day ends
      </Text>

      <Text className="font-inter-bold text-white text-base">
        Completed your habit for the day?
      </Text>

      <Text className="font-inter-regular text-white text-base mb-4">
        See your friends’ progress with their habits & show them some love!
      </Text>

      <Text className="font-inter-bold text-white text-base">
        Skipped your habit for the day?
      </Text>

      <Text className="font-inter-regular text-white text-base">
        If you do not complete your habit within the 24 hour period, your profile will be made visible to your friends, letting them know your habit was incomplete.
      </Text>

      <View className="w-full items-center"><View className="border-b w-64 border-white my-8"></View></View>

      <Text className="text-white font-inter-bold text-lg text-center">Warning</Text>

      <View className="w-full items-center">
        <Image 
          className="w-10 h-10 my-4"
          source={images.caution}
          resizeMode="contain"
        />
      </View>
      
      <Text className="font-inter-regular text-white text-base">
        Failure to complete your habit within 24 hours will result in your profile being displayed on your friends’ feeds, indicating the incomplete task.
      </Text>
      
      <View className="w-full items-center"><View className="border-b w-64 border-white my-8"></View></View>

      <Text className="text-white font-inter-bold text-lg text-center mb-4">Rules</Text>

      <Text className="font-inter-bold text-white text-base">
        Be Kind & Respectful
      </Text>

      <Text className="font-inter-regular text-white text-base mb-4">
        Bullying, Abuse, Harassment: You may not post any content that complies to bullying, abuse, or harassment. 
      </Text>

      <Text className="font-inter-regular text-white text-base mb-4">
        You may not share any hateful content towards any person or community. We do not tolerate any hateful comments.
      </Text>

      <Text className="font-inter-bold text-white text-base">
        Consent and Ownership 
      </Text>

      <Text className="font-inter-regular text-white text-base mb-4">
        You have all rights to the photos that are posted on the platform. If at anytime you want a posting of yours to be removed, send a message to us, and we will have that post deleted. 
      </Text>

      <Text className="font-inter-bold text-white text-base">
        Content
      </Text>

      <Text className="font-inter-regular text-white text-base">
        Nudity, Violence, Self-Harm: You may not share any content that is threatening, expresses any desire for violence or hard, non-consensual nudity, or promotes or encourages self-harm.
      </Text>
    </ScrollView>
  )
}

export default NormText