import { Stack } from 'expo-router'
import QueryProvider from '../../context/QueryProvider'

const SetupLayout = () => {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="friend-setup" options={{ headerShown: false }} />
        <Stack.Screen name="habit-setup" options={{ headerShown: false }} />
        <Stack.Screen name="norm-setup" options={{ headerShown: false }} />
        <Stack.Screen name="friend-search" options={{ headerShown: false }} />
      </Stack>
    </QueryProvider>
  )
}

export default SetupLayout