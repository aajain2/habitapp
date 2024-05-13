import { router } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../../components/SignUpButton';
import BackButton from '../../components/BackButton';
import images from '../../constants/images';

const Permissions = () => {
  return (
    <SafeAreaView>
      <View className="h-full">
        <View className="absolute w-full h-10 justify-center">
          <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
        </View>

        <BackButton 
          containerStyles="absolute pl-4 h-10 justify-center"
          handlePress={() => router.back()}
        />

        <View className="flex items-center justify-center h-full">
          <View className="flex items-center">
            <Text className="font-inter-bold text-lg">Allow permissions.</Text>
            <Text className="font-inter-regular w-52 text-xs text-center">
              We need to let you know when your habit prompt is posted each day and we need you to take photos of your habits!
            </Text>
          </View>

          <View className="mt-10 flex-row">
            <Image 
              source={images.footstepsEmpty}
            />

            <View className="justify-center flex-col gap-4">
              <Text>Allow push notifications</Text>
              <Text>Allow camera</Text>
            </View>
          </View>

          <SignUpButton
            handlePress={() => router.push("/welcome")}
            title="Allow notifications"
            containerStyles="mt-10"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Permissions
