import { Text, SafeAreaView, Image, View, Alert } from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images'
import SignUpInput from '../../components/SignUpInput'
import CustomButton from '../../components/buttons/CustomButton'
import DismissKeyboard from '../../components/DismissKeyboard'
import BackButton from '../../components/buttons/BackButton'
import { router } from 'expo-router'
import { getCurrentUser, handleLogIn } from '../../functions/auth'
import { useGlobalContext } from '../../context/GlobalProvider'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLogged } = useGlobalContext();  

  const login = async () => {
    try {
      const success = await handleLogIn(email, password)
    
      if (success) {
        const user = await getCurrentUser()
        setUser(user)
        setIsLogged(true)
  
        while (router.canGoBack()) {
          router.back()
        }
        router.replace("/home")
      }
    } catch (e) {
      Alert.alert("Incorrect email and password")
    }
    
  }

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <BackButton 
            containerStyles="absolute pl-4 h-10 justify-center"
            handlePress={() => router.back()}
          />

          <View className="flex items-center justify-center h-full">
            <Image
              className="mb-6"
              source={images.rainbowRabbit}
            />
            <Text className="text-2xl font-inter-bold mb-8">
              Login
            </Text>

            <SignUpInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              containerStyles="mb-6"
              handleChangeText={setEmail}
              placeholder="Email"
              value={email}
            />

            <SignUpInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              containerStyles="mb-14"
              handleChangeText={setPassword}
              placeholder="Password"
              password
              value={password}
            />

            <CustomButton 
              title="Login"
              handlePress={() => login()}
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default Login;