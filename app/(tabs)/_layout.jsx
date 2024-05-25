import { Stack } from 'expo-router'
import React from 'react'
import QueryProvider from '../../context/QueryProvider'

const TabsSetup = () => {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="friends" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
      </Stack>
    </QueryProvider>
    
  )
}

export default TabsSetup