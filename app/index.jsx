import { router } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import images from '../constants/images';
import TrabitHeader from '../components/TrabitHeader';

const App = () => {
  return (
    <SafeAreaView className="flex justify-center items-center h-full">
      <Image 
        className="w-14 h-16"
        source={images.orangeRabbit}
        resizeMode="contain"
      />

      <TrabitHeader 
        absolute={false}
        color="orange"
      />

      <View className="my-10">
        <Text className="font-inter-bold text-2xl text-center">
          Hello!
        </Text>

        <Text className="font-inter-regular text-sm w-72 text-center mt-2">
          Welcome to Trabit, where you can keep track of your daily habits with you friends.
        </Text>
      </View>

      <CustomButton 
        title="Login"
        handlePress={() => {
          router.navigate("/home")
        }}
      />

      <CustomButton
        containerStyles="mt-4 border-2 border-blue bg-transparent"
        textStyles="text-blue"
        title="Sign Up"
        handlePress={() => {
          router.navigate("/name")
        }}
      />
    </SafeAreaView>
  )
}

export default App
