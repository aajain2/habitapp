import { View, Text } from 'react-native'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundVideo from '../../components/BackgroundVideo';
import images from '../../constants/images';
import HabitSelector from '../../components/habit-selector/HabitSelector';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import TrabitHeader from '../../components/TrabitHeader';

const habitOptions = [
  {
    name: "gym",
    title: "Going to the Gym",
    subtitle: "In our fitness era",
    imageSource: images.gymWeights,
    id: 0
  }, 
  {
    name: "veggies",
    title: "Eating More Vegetables",
    subtitle: "A little a day goes a long way",
    imageSource: images.carrot,
    id: 1
  }, 
  {
    name: "showering",
    title: "Showering",
    subtitle: "Hey, life gets busy we get it",
    imageSource: images.shower,
    id: 2
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
          <TrabitHeader color="white" />

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

            <CustomButton 
              title="Next"
              containerStyles="bg-white/30 border-white mt-8"
              handlePress={() => router.push("friend-setup")}
            />
          </View>
        </View>
      </SafeAreaView>

      <StatusBar style="light" />
    </View>
  )
}

export default HabitSetup