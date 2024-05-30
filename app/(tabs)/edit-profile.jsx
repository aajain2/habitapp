import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileHeaderBar from '../../components/home/ProfileHeaderBar'
import ProfilePicture from '../../components/ProfilePicture'
import { StatusBar } from 'expo-status-bar'
import ThinCustomButton from '../../components/buttons/ThinCustomButton'
import ProfileEditLink from '../../components/ProfileEditLink'
import ChangeSensitiveLink from '../../components/ChangeSensitiveLink'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'

const EditProfile = () => {
  const { user } = useGlobalContext()

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
          source={user.avatar}
          containerStyles="w-[150px] h-[150px]"
        />

        <ThinCustomButton
          containerStyles="bg-transparent border border-blue mt-4"
          textStyles="text-blue"
          title="Edit Profile Picture"
          handlePress={() => router.navigate({
            pathname: "/avatar",
            params: { field: "profilePicture" }
          })}
        />

        <View className="w-[90vw]">
          <ProfileEditLink
            containerStyles="mt-4"
            field="First Name"
            value={`${user.firstName}`}
            handlePress={() => router.navigate({ 
              pathname: "/field-edit", 
              params: { field: "firstName", fieldValue: user.firstName }
            })}
          />

          <ProfileEditLink
            containerStyles="mt-2"
            field="Last Name"
            value={`${user.lastName}`}
            handlePress={() => router.navigate({ 
              pathname: "/field-edit", 
              params: { field: "lastName", fieldValue: user.lastName }
            })}
          />

          <ProfileEditLink 
            containerStyles="mt-2"
            field="Username"
            value={`${user.username}`}
            handlePress={() => router.navigate({ 
              pathname: "/field-edit", 
              params: { field: "username", fieldValue: user.username }
            })}
          />

          <ProfileEditLink 
            containerStyles="mt-2"
            field="Habit"
            value={`${user.habitDescription}`}
            handlePress={() => router.navigate({ 
              pathname: "/habit-setup", 
              params: { field: "habit", fieldValue: user.habitDescription }})}
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