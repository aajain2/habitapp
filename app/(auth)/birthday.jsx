import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';

const BirthdaySignUp = () => {
  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <View className="absolute w-full">
            <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
          </View>

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">When’s your birthday?</Text>
              <Text className="font-inter-regular text-xs w-48 text-center">Just checking you’re old enough for Trabit.</Text>
            </View>

            <SignUpInput 
              containerStyles="my-2 mt-12"
            />

            <SignUpButton 
              handlePress={() => {
                router.push("phone-number")
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
