import { router, useLocalSearchParams } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import DismissKeyboard from '../../components/DismissKeyboard';
import BackButton from '../../components/buttons/BackButton';
import TrabitHeader from '../../components/TrabitHeader';
import images from '../../constants/images';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

const AvatarSelection = () => {
  const [image, setImage] = useState(null)
  const { field, fieldValue } = useLocalSearchParams();

  useEffect(() => {
    setImage(fieldValue)
  }, [fieldValue])
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
              className="w-[150px] h-[150px] mb-4 rounded-full"
              resizeMode="contain"
              source={field || image ? { uri: image } : images.avatar}
            />

            <View className="my-4 flex items-center">
              <Text className="font-inter-bold text-lg">Choose a profile picture</Text>
            </View>

            <CustomButton
              containerStyles="bg-transparent border-2 border-blue"
              textStyles="text-blue"
              title="Select image"
              handlePress={pickImage}
            />

            <CustomButton
              handlePress={() => {
                if (field) {
                  router.navigate("/edit-profile")
                } else {
                  router.navigate("/permissions")
                }
              }}
              title="Save"
              containerStyles="mt-4"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default AvatarSelection
