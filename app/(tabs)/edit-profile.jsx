import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileHeaderBar from '../../components/home/ProfileHeaderBar'
import ProfilePicture from '../../components/ProfilePicture'
import { StatusBar } from 'expo-status-bar'
import ThinCustomButton from '../../components/buttons/ThinCustomButton'
import ProfileEditLink from '../../components/ProfileEditLink'
import ChangeSensitiveLink from '../../components/ChangeSensitiveLink'
import { router } from 'expo-router'

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

const EditProfile = () => {
  return (
    <SafeAreaView>
      <View className="z-50">
        <ProfileHeaderBar
          containerStyles="absolute"
          title="Edit Profile and Account"
        />
      </View>

      <View className="h-full flex-column justify-center items-center">
        <ProfilePicture 
          source={dummyProfile.profilePicture}
          containerStyles="w-[150px] h-[150px]"
        />

        <ThinCustomButton
          containerStyles="bg-transparent border border-blue mt-4"
          textStyles="text-blue"
          title="Edit Profile Picture"
          handlePress={() => router.navigate("avatar")}
        />

        <View className="w-[90vw]">
          <ProfileEditLink
            containerStyles="mt-4"
            field="First Name"
            value={`${dummyProfile.firstName}`}
            handlePress={() => router.navigate({ 
              pathname: "/field-edit", 
              params: { field: "first-name", fieldValue: dummyProfile.firstName }
            })}
          />

          <ProfileEditLink
            containerStyles="mt-2"
            field="Last Name"
            value={`${dummyProfile.lastName}`}
            handlePress={() => router.navigate({ 
              pathname: "/field-edit", 
              params: { field: "last-name", fieldValue: dummyProfile.lastName }
            })}
          />

          <ProfileEditLink 
            containerStyles="mt-2"
            field="Username"
            value={`${dummyProfile.username}`}
            handlePress={() => router.navigate({ 
              pathname: "/field-edit", 
              params: { field: "username", fieldValue: dummyProfile.username }
            })}
          />

          <ProfileEditLink 
            containerStyles="mt-2"
            field="Habit"
            value={`${dummyProfile.habit}`}
            handlePress={() => router.navigate({ 
              pathname: "/habit-setup", 
              params: { field: "habit", fieldValue: dummyProfile.habit }})}
          />

          <Text className="text-base font-inter-bold my-4 text-center">Manage Account</Text>

          <ChangeSensitiveLink
            containerStyles="mb-2"
            title="Change Email"
          />

          <ChangeSensitiveLink
            title="Change Password"
          />
        </View>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default EditProfile