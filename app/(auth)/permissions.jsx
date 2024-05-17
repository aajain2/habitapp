import { router } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import BackButton from '../../components/buttons/BackButton';
import images from '../../constants/images';
import TrabitHeader from '../../components/TrabitHeader';

const Permissions = () => {
  return (
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

          <CustomButton
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
