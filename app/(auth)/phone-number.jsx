import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';

const PhoneNumberSignUp = () => {
  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <View className="absolute w-full">
            <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
          </View>

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">What’s your phone number?</Text>
              <Text className="font-inter-regular text-xs w-48 text-center">Let’s create your account using your phone number.</Text>
            </View>

            <SignUpInput 
              containerStyles="my-2 mt-12"
              caption="Message & data rates may apply."
            />

            <SignUpButton 
              handlePress={() => {
                router.push("/verification")
              }}
              title="Send Verification Code"
              containerStyles="mt-32"
            />

            <Text className="mt-8 w-80 text-center text-xs">
              By tapping “Send verification code”, you consent to receive text messages from us. 
              Text HELP for help and STOP to opt out.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

export default PhoneNumberSignUp
