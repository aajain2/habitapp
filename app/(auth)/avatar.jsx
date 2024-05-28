import { router } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import DismissKeyboard from '../../components/DismissKeyboard';
import BackButton from '../../components/buttons/BackButton';
import TrabitHeader from '../../components/TrabitHeader';
import images from '../../constants/images';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const AvatarSelection = () => {
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("Set image");
    }
  };

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
              className="w-16 h-16 mb-4 rounded-full"
              resizeMode="contain"
              source={image ? { uri: image } : images.avatar}
            />

            <View className="h-20 flex items-center">
              <Text className="font-inter-bold text-lg">Choose a profile picture</Text>
              <Text className="font-inter-regular text-xs">Lorem apsum</Text>
            </View>

            <CustomButton 
              title="Select image"
              handlePress={pickImage}
            />

            <CustomButton
              handlePress={() => router.navigate("/permissions")}
              title="Save"
              containerStyles="mt-32"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default AvatarSelection
