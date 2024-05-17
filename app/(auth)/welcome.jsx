import { router } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import BackButton from '../../components/buttons/BackButton';
import images from '../../constants/images';

const Welcome = () => {
  return (
    <SafeAreaView>
      <View className="h-full">
        <BackButton 
          containerStyles="absolute pl-4 h-10 justify-center"
          handlePress={() => router.back()}
        />

        <View className="flex items-center justify-center h-full">
          <Text className="font-inter-bold text-lg">Welcome to</Text>

          <Image 
            className="mt-12"
            source={images.rainbowRabbit} 
          />

          <Text className="text-3xl text-orange font-alata-regular text-center mt-2">TRABIT</Text>

          <CustomButton
            handlePress={() => router.replace("/habit-setup")}
            title="Get started"
            containerStyles="mt-14"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Welcome
