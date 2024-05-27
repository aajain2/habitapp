import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import ProfileHeaderBar from '../../components/home/ProfileHeaderBar';
import DismissKeyboard from '../../components/DismissKeyboard';
import ThinCustomButton from '../../components/buttons/ThinCustomButton';

const EditInfo = () => {
  const { field, fieldValue } = useLocalSearchParams();
  const [mode, setMode] = useState("")
  const [value, setValue] = useState("")

  useEffect(() => {
    if (field === "first-name") {
      setMode("First Name")
    }

    if (field === "last-name") {
      setMode("Last Name")
    }

    if (field === "username") {
      setMode("Username")
    }

    if (field === "password") {
      setMode("Password")
    }

    if (field === "habit") {
      setMode("Habit")
    }
  }, [field])

  useEffect(() => {
    setValue(fieldValue)
  }, [fieldValue])

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <ProfileHeaderBar 
          title={`Edit ${mode}`}
        />

        <View className="w-full h-full flex items-center">
          <View className="w-[90vw] flex-row mt-6 items-center">
            <Text className="text-base font-inter-bold w-28">
              {mode}
            </Text>

            <TextInput 
              className="font-inter-regular text-base -top-[2px] flex-grow"
              placeholder={`Enter in your new ${mode}`}
              value={value}
              onChangeText={setValue}
            />
          </View>

          <ThinCustomButton
            containerStyles="mt-4 px-4 py-1 border border-blue bg-transparent"
            textStyles="text-blue"
            title="Save"
            handlePress={() => console.log(value)}
          />
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default EditInfo