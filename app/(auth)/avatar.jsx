import { router } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import SignUpInput from '../../components/SignUpInput';
import DismissKeyboard from '../../components/DismissKeyboard';
import BackButton from '../../components/buttons/BackButton';
import { useSignUpContext } from '../../context/SignUpProvider';
import TrabitHeader from '../../components/TrabitHeader';
import images from '../../constants/images';

const AvatarSelection = () => {
  const { firstName, setFirstName, lastName, setLastName } = useSignUpContext();

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
            <Image 
              className="w-16 h-16 mb-4"
              resizeMode="contain"
              source={images.avatar}
            />

            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">Choose a profile picture</Text>
              <Text className="font-inter-regular text-xs">Lorem apsum</Text>
            </View>

            <CustomButton
              handlePress={() => router.navigate("/permissions")}
              title="Next"
              containerStyles="mt-32"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default AvatarSelection
