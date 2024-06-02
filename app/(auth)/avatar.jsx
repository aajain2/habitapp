import { router, useLocalSearchParams } from 'expo-router'
import { Alert, Image, SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import DismissKeyboard from '../../components/DismissKeyboard';
import BackButton from '../../components/buttons/BackButton';
import TrabitHeader from '../../components/TrabitHeader';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalProvider';
import { uploadAvatar } from '../../firebase/avatar';
import { getCurrentUser } from '../../firebase/auth';

const AvatarSelection = () => {
  const { field } = useLocalSearchParams()
  const { user, setUser } = useGlobalContext()
  const [image, setImage] = useState(user.avatar)
  const [uploading, setUploading] = useState(false)

  const onStart = () => {
    setUploading(true)
  }

  const onFail = (e) => {
    Alert.alert(e.message)
  }

  const onFinish = async () => {
    setUploading(false)
    
    const user = await getCurrentUser()

    setUser(user)

    if (field) {
      router.navigate("/edit-profile")
    } else {
      router.navigate("/welcome")
    }
  }

  const handleSave = async () => {
    await uploadAvatar(
      image, 
      user.uid,
      {
        onStart: onStart,
        onFail: onFail,
        onFinish: onFinish
      }
    )
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.1,
    })

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
              source={{ uri: image }}
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
              isLoading={uploading}
              handlePress={() => handleSave()}
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
