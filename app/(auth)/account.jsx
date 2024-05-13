import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';

import { useSignUpContext } from '../../context/SignUpProvider';

const Account = () => {
  const { name,
          birthday, 
          email, 
          username, setUsername, 
          password, setPassword
        } = useSignUpContext()

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <View className="absolute w-full">
            <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
          </View>

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">Let’s create an account.</Text>
              <Text className="font-inter-regular text-xs">Use it for future log ins!</Text>
            </View>

            <SignUpInput 
              containerStyles="mt-12"
              handleChangeText={(e) => setUsername(e)}
              placeholder="Username"
              value={username}
            />

            <SignUpInput 
              containerStyles="mt-12"
              handleChangeText={(e) => setPassword(e)}
              placeholder="Password"
              value={password}
            />

            <SignUpInput
              containerStyles=""
              placeholder="Verify Password"
            />

            <SignUpButton
              containerStyles="mt-16"
              handlePress={() => 
                console.log(`Name: ${name}, Birthday: ${birthday}, Email: ${email}, Username: ${username}, Password: ${password}`)
              }
              title="Next"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default Account
