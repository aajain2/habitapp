import { Stack } from 'expo-router'
import React from 'react'
import QueryProvider from '../../context/QueryProvider'

const TabsSetup = () => {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="friends" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
        <Stack.Screen name="comments" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
        <Stack.Screen name="[edit]" options={{ headerShown: false }} />
      </Stack>
    </QueryProvider>
  )
}

export default TabsSetup