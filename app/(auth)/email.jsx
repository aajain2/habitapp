import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import validator from 'validator';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';

import BackButton from '../../components/BackButton';
import { useSignUpContext } from '../../context/SignUpProvider';
import { useState } from 'react';
import TrabitHeader from '../../components/TrabitHeader';

const EmailSignUp = () => {
  const { email, setEmail } = useSignUpContext()
  const [error, setError] = useState(false)

  const emailSubmit = () => {
    if (validator.isEmail(email)) {
      setError(false)
      router.push("/verification")
    } else {
      setError(true)
    }
  }

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
              <Text className="font-inter-bold text-lg">What’s your email?</Text>
              <Text className="font-inter-regular text-xs w-48 text-center">Let’s create your account using your email.</Text>
            </View>

            <SignUpInput 
              autoCapitalize="none"
              autoCorrect="off"
              containerStyles="mt-12"
              error={error}
              errorMessage="Please enter a valid email address"
              handleChangeText={(e) => {
                setEmail(e)
                setError(false)
              }}
              keyboardType="email-address"
              value={email}
            />

            <SignUpButton 
              handlePress={() => emailSubmit()}
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
