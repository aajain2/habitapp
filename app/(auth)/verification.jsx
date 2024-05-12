import { Link, router } from 'expo-router'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';
import CustomLink from '../../components/CustomLink';

const VerificationSignUp = () => {
  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <View className="absolute w-full">
            <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
          </View>

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">Enter the verification code we sent.</Text>
            </View>

            <SignUpInput 
              containerStyles="mt-12"
            />

            <CustomLink 
              title="Resend code..."
            />

            <SignUpButton 
              handlePress={() => {
                router.push("/account")
              }}
              title="Verify"
              containerStyles="mt-32"
            />

            <CustomLink
              containerStyles="mt-4"
              title="Change Phone Number"
              handlePress={() => {
                router.back()
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

export default VerificationSignUp
