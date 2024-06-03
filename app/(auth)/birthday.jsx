import { router } from 'expo-router'
import { SafeAreaView, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import DismissKeyboard from '../../components/DismissKeyboard';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BackButton from '../../components/buttons/BackButton';
import { useSignUpContext } from '../../context/SignUpProvider';
import TrabitHeader from '../../components/TrabitHeader';
import { useState } from 'react';

const isOver18YearsOld = (birthday) => {
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  return birthday < eighteenYearsAgo;
};

const BirthdaySignUp = () => {
  const { birthday, setBirthday } = useSignUpContext();
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const colorScheme = useColorScheme()

  console.log(colorScheme)

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <TrabitHeader 
            color="orange"
          />

          <BackButton 
            containerStyles="absolute pl-4 h-10 justify-center"
            handlePress={() => router.back()}
          />

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">When’s your birthday?</Text>
              <Text className="font-inter-regular text-xs w-48 text-center">Just checking you’re old enough for Trabit.</Text>
            </View>

            <TouchableOpacity
              className="w-44 py-2 border-b-2"
              onPress={() => {
                setShowBirthdayPicker(true)
              }}
            >
              <Text className="font-inter-regular text-center text-lg">{birthday.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {ageError && 
              <Text className="text-[10px] text-red-500 font-inter-bold mt-1 w-44">
                You must be of 18 years of age to use this app.
              </Text>
            }

            <DateTimePickerModal 
              date={birthday}
              isVisible={showBirthdayPicker}
              mode="date"
              onChange={(date) => {
                setBirthday(date)
              }}
              onConfirm={(date) => {
                setBirthday(date)
                setShowBirthdayPicker(false)
              }}
              onCancel={() => {
                setShowBirthdayPicker(false)
              }}
              isDarkModeEnabled
            />

            <CustomButton 
              handlePress={() => {
                if (!isOver18YearsOld(birthday)) {
                  setAgeError(true)
                  return
                }
                
                setAgeError(false)
                router.navigate("email")
              }}
              title="Next"
              containerStyles="mt-32"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

export default BirthdaySignUp
