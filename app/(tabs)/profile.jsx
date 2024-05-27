import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import ProfileHeaderBar from '../../components/home/ProfileHeaderBar'
import ProfilePicture from '../../components/ProfilePicture'
import CustomButton from '../../components/buttons/CustomButton'
import images from '../../constants/images'

const dummyProfile = {
  username: "abe",
  firstName: "Abraham",
  lastName: "Lincoln",
  profilePicture: "https://picsum.photos/200",
  streak: 5,
  bestStreak: 23,
  habit: "Eating more vegetables",
  totalPosts: 149
}

const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <ProfileHeaderBar
          containerStyles="absolute"
          title="Profile"
        />
      </View>

      <View className="h-full flex-column justify-center items-center">
        <ProfilePicture 
          source={dummyProfile.profilePicture}
          containerStyles="w-[150px] h-[150px]"
        />

        <Text className="text-xl font-inter-bold mt-4">{dummyProfile.firstName} {dummyProfile.lastName}</Text>
        <Text className="text-base font-inter-regular mb-4">@{dummyProfile.username}</Text>

        <CustomButton 
          title="Edit Profile and Account"
          containerStyles="w-44 h-6 border border-blue bg-transparent"
          textStyles="text-blue font-inter-regular"
        />

        <View className="bg-orange/30 h-44 w-[90vw] rounded-2xl flex items-center justify-center my-4">
          <Image
            className="w-14 h-16"
            source={images.fire}
            resizeMode="contain"
          />
          <Text className="text-orange font-inter-medium text-2xl">
            {dummyProfile.streak} Days Streak
          </Text>
          <Text className="font-inter-regular">
            Your best is {dummyProfile.bestStreak} days
          </Text>
        </View>

        <View className="h-44 w-[90vw] flex-row">
          <View className="bg-searchbar-gray flex-grow rounded-2xl flex items-center justify-center">
            <Text className="text-sm font-inter-bold">
              You are tracking:
            </Text>

            <Text className="font-inter-regular w-36 text-center text-xs">
              {dummyProfile.habit}
            </Text>
          </View>

          <View className="w-4"></View>

          <View className="bg-searchbar-gray flex-grow rounded-2xl flex items-center justify-center">
            <Text className="text-sm font-inter-bold">
              You have completed:
            </Text>

            <Text className="font-inter-bold text-4xl">{dummyProfile.totalPosts}</Text>

            <Text className="font-inter-regular w-36 text-center text-xs">
              Days of your habit
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile