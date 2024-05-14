import { View, Text } from 'react-native'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundVideo from '../../components/BackgroundVideo';
import images from '../../constants/images';
import HabitSelector from '../../components/habit-selector/HabitSelector';
import { useState } from 'react';
import SignUpButton from '../../components/SignUpButton';
import { router } from 'expo-router';

const habitOptions = [
  {
    name: "gym",
    title: "Going to the Gym",
    subtitle: "In our fitness era",
    imageSource: images.gymWeights
  }, 
  {
    name: "veggies",
    title: "Eating More Vegetables",
    subtitle: "A little a day goes a long way",
    imageSource: images.carrot
  }, 
  {
    name: "showering",
    title: "Showering",
    subtitle: "Hey, life gets busy we get it",
    imageSource: images.shower
  }
]

const HabitSetup = () => {
  const [selected, setSelected] = useState(null)

  return (
    <View className="w-full h-full">
      <BackgroundVideo
        source={videos.blueOrangeBackground}
      />

      <SafeAreaView>
        <View>
          <View className="absolute w-full h-10 justify-center z-10">
            <Text className="text-3xl text-white font-alata-regular text-center">TRABIT</Text>
          </View>

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="text-white font-inter-bold text-lg">Let’s set up your habit</Text>
              <Text className="text-white font-inter-regular text-xs w-52 text-center">You can change your goal as much as you would like</Text>
            </View>

            <HabitSelector
              selected={selected}
              setSelected={setSelected}
              habitOptions={habitOptions}
            />

            <SignUpButton 
              title="Next"
              containerStyles="bg-white/30 border-white mt-8"
              handlePress={() => router.push("friend-setup")}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HabitSetup