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
import { getHabit, getHabits, saveHabit } from '../../firebase/habits';
import { useGlobalContext } from '../../context/GlobalProvider';
import { pickRandomItem } from '../../util/pickRandomItem';

const HabitSetup = () => {
  const [selected, setSelected] = useState(null)
  const [habitOptions, setHabitOptions] = useState(null)
  const { field } = useLocalSearchParams()
  const { user, setUser } = useGlobalContext()

  const handleSave = () => {
    const randomPrompt = pickRandomItem(selected.prompts)

    saveHabit(user.uid, selected.habit, selected.habitDescription, randomPrompt)
      .then(async () => {
        setUser({
          ...user,
          habit: selected.habit,
          habitDescription: selected.habitDescription,
          todaysPrompt: randomPrompt
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
    if (user.habit) {
      getHabit(user.habit)
        .then((habit) => {
          setSelected({
            habit: habit.id,
            habitDescription: habit.name,
            prompts: habit.prompts
          })
        })
        .catch((e) => {
          Alert.alert(e.message)
        })
    }

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
                      prompts={item.prompts}
                      selected={selected}
                      setSelected={setSelected}
                      key={item.id}
                      imageURI={item.picture}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
            

            <CustomButton 
              title={field ? "Save" : "Next"}
              containerStyles="bg-white/30 border-white mt-8"
              handlePress={() => {
                if (selected) {
                  handleSave()
                } else {
                  Alert.alert("Please select a habit")
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>

      <StatusBar style="light" />
    </View>
  )
}

export default HabitSetup