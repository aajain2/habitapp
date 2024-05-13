import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';
import validator from 'validator';

import BackButton from '../../components/BackButton';
import { useSignUpContext } from '../../context/SignUpProvider';
import { useState } from 'react';

const Account = () => {
  const { name,
          birthday, 
          email, 
          username, setUsername, 
          password, setPassword
        } = useSignUpContext()

  const [verifyPassword, setVerifyPassword] = useState("")

  const [passwordStrengthError, setPasswordStrengthError] = useState(false)

  const accountSubmit = () => {
    if ((verifyPassword === password) && !passwordStrengthError) {
      router.push("home")
    }
  }

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <View className="absolute w-full">
            <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
          </View>

          <BackButton 
            containerStyles="absolute pl-4 h-10 justify-center"
            handlePress={() => router.back()}
          />

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">Let’s create an account.</Text>
              <Text className="font-inter-regular text-xs">Use it for future log ins!</Text>
            </View>

            <SignUpInput 
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              containerStyles="mt-12"
              handleChangeText={(e) => setUsername(e)}
              placeholder="Username"
              value={username}
            />

            <SignUpInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              containerStyles="mt-20"
              error={passwordStrengthError}
              errorMessage="Please enter a strong password. Must be 8 characters long, include one uppercase letter, one symbol, and one number."
              handleChangeText={(e) => {
                setPassword(e)
                setPasswordStrengthError(!validator.isStrongPassword(e))
              }}
              password={true}
              placeholder="Password"
              value={password}
            />

            <SignUpInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              containerStyles="mt-4"
              error={password !== verifyPassword}
              errorMessage="Passwords do not match"
              handleChangeText={(e) => setVerifyPassword(e)}
              password={true}
              placeholder="Verify Password"
            />

            <SignUpButton
              containerStyles="mt-16"
              handlePress={() => {
                accountSubmit()
              }}
              title="Next"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default Account
