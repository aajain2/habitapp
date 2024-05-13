import { router } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';

import { useSignUpContext } from '../../context/SignUpProvider';

const NameSignUp = () => {
  const { name, setName } = useSignUpContext();

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View className="h-full">
          <View className="absolute w-full">
            <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
          </View>

          <View className="flex items-center justify-center h-full">
            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">What's your name?</Text>
              <Text className="font-inter-regular text-xs">First and Last Please!</Text>
            </View>

            <SignUpInput 
              containerStyles="mt-12"
              handleChangeText={(e) => setName(e)}
              value={name}
            />

            <SignUpButton
              handlePress={() => {
                router.push("/birthday")
              }}
              title="Next"
              containerStyles="mt-32"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default NameSignUp
