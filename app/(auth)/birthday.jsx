import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';

import BackButton from '../../components/BackButton';
import { useSignUpContext } from '../../context/SignUpProvider';
import TrabitHeader from '../../components/TrabitHeader';

const BirthdaySignUp = () => {
  const { birthday, setBirthday } = useSignUpContext();

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

            <SignUpInput 
              containerStyles="mt-12"
              handleChangeText={(e) => setBirthday(e)}
              value={birthday}
            />

            <SignUpButton 
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
