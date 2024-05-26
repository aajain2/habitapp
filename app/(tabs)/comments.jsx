import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ProfileHeaderBar from '../../components/home/ProfileHeaderBar'
import DismissKeyboard from '../../components/DismissKeyboard'
import { StatusBar } from 'expo-status-bar'

const Comments = () => {
  return (
    <DismissKeyboard>
      <>
        <SafeAreaView>
          <View>
            <ProfileHeaderBar 
              title="Title"
              subtitle="Subtitle"
            />
            <Text>Comments</Text>
          </View>
        </SafeAreaView>

        <StatusBar style="dark" />
      </>
    </DismissKeyboard>
  )
}

export default Comments