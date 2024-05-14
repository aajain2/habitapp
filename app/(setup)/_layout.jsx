import { Stack } from 'expo-router'
import React from 'react'

const SetupLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="friend-setup" options={{ headerShown: false }} />
      <Stack.Screen name="habit-setup" options={{ headerShown: false }} />
      <Stack.Screen name="norm-setup" options={{ headerShown: false }} />
    </Stack>
  )
}

export default SetupLayout