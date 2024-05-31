import { View, Text, FlatList, Alert } from 'react-native'
import videos from '../../constants/videos'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundVideo from '../../components/BackgroundVideo';
import { useEffect, useState } from 'react';
import CustomButton from '../../components/buttons/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import TrabitHeader from '../../components/TrabitHeader';
import BackButton from '../../components/buttons/BackButton';
import HabitCard from '../../components/HabitCard';
import { getHabits, saveHabit } from '../../firebase/habits';
import { useGlobalContext } from '../../context/GlobalProvider';

const HabitSetup = () => {
  const [selected, setSelected] = useState(null)
  const [habitOptions, setHabitOptions] = useState(null)
  const { field } = useLocalSearchParams()
  const { user, setUser } = useGlobalContext()

  const handleSave = () => {
    saveHabit(user.uid, selected.habit, selected.habitDescription)
      .then(async () => {
        setUser({
          ...user,
          habit: selected.habit,
          habitDescription: selected.habitDescription
        })

        if (field) {
          router.navigate("edit-profile")
        } else {
          router.navigate("friend-setup")
        }
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }

  useEffect(() => {
    setSelected({
      habit: user.habit,
      habitDescription: user.habitDescription
    })

    getHabits()
      .then((habits) => {
        setHabitOptions(habits)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }, [])

  return (
    <View className="w-full h-full">
      <BackgroundVideo
        source={videos.blueOrangeBackground}
      />

      <SafeAreaView>
        <View>
          <TrabitHeader color="white" />

          {field && 
            <BackButton 
              containerStyles="absolute pl-4 h-10 justify-center"
              handlePress={() => router.back()}
              iconColor="white"
            />
          }

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="text-white font-inter-bold text-lg">Let’s set up your habit</Text>
              <Text className="text-white font-inter-regular text-xs w-52 text-center">You can change your goal as much as you would like</Text>
            </View>

            <View className="h-96">
              <FlatList
                data={habitOptions}
                renderItem={({ item }) => (
                  <View className="my-2">
                    <HabitCard
                      title={item.name}
                      subtitle={item.description}
                      name={item.id}
                      selected={selected}
                      setSelected={setSelected}
                      key={item.id}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
            

            <CustomButton 
              title={field ? "Save" : "Next"}
              containerStyles="bg-white/30 border-white mt-8"
              handlePress={() => handleSave()}
            />
          </View>
        </View>
      </SafeAreaView>

      <StatusBar style="light" />
    </View>
  )
}

export default HabitSetup