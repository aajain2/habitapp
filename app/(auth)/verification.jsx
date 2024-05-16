import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';
import CustomLink from '../../components/CustomLink';
import BackButton from '../../components/BackButton';
import TrabitHeader from '../../components/TrabitHeader'

const VerificationSignUp = () => {
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
              <Text className="font-inter-bold text-lg">Enter the verification code we sent.</Text>
            </View>

            <SignUpInput 
              containerStyles="mt-12"
              keyboardType="number-pad"
            />

            <CustomLink 
              containerStyles="mt-4"
              title="Resend code..."
            />

            <CustomButton 
              handlePress={() => {
                router.push("/account")
              }}
              title="Verify"
              containerStyles="mt-32"
            />

            <CustomLink
              containerStyles="mt-4"
              title="Change Email"
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
