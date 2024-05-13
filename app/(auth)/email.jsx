import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';

import { useSignUpContext } from '../../context/SignUpProvider';

const EmailSignUp = () => {
  const { email, setEmail } = useSignUpContext()

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <View className="absolute w-full">
            <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
          </View>

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">What’s your email?</Text>
              <Text className="font-inter-regular text-xs w-48 text-center">Let’s create your account using your email.</Text>
            </View>

            <SignUpInput 
              autoCapitalize="none"
              containerStyles="mt-12"
              handleChangeText={(e) => setEmail(e)}
              keyboardType="email-address"
              value={email}
            />

            <SignUpButton 
              handlePress={() => {
                router.push("/verification")
              }}
              title="Send Verification Code"
              containerStyles="mt-32"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

export default EmailSignUp
