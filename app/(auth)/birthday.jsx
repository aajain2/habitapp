import { router } from 'expo-router'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import DismissKeyboard from '../../components/DismissKeyboard';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BackButton from '../../components/buttons/BackButton';
import { useSignUpContext } from '../../context/SignUpProvider';
import TrabitHeader from '../../components/TrabitHeader';

import { useState } from 'react';

const BirthdaySignUp = () => {
  const { birthday, setBirthday } = useSignUpContext();
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false)

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

            <DateTimePickerModal 
              date={birthday}
              isVisible={showBirthdayPicker}
              mode="date"
              onConfirm={(date) => {
                setBirthday(date)
                setShowBirthdayPicker(false)
              }}
              onCancel={() => {
                setShowBirthdayPicker(false)
              }}
            />

            <CustomButton 
              handlePress={() => {
                router.push("email")
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
