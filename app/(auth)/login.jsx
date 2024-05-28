import { Text, SafeAreaView, Image, View } from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images'
import SignUpInput from '../../components/SignUpInput'
import CustomButton from '../../components/buttons/CustomButton'
import DismissKeyboard from '../../components/DismissKeyboard'
import BackButton from '../../components/buttons/BackButton'
import { router } from 'expo-router'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebaseConfig.js'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '355540549767-02iuv64ujl9fee5sls3ovshdch8vmif4.apps.googleusercontent.com'
})
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error);
    }
  };

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
              title="Continue with Google"
              onPress={signInWithGoogle}
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default Login;