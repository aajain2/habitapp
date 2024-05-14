import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import 'react-native-reanimated'

import SignUpProvider from "../context/SignUpProvider"

const RootLayout = () => {
  const[fontsLoaded, error] = useFonts({
    "Alata-Regular": require("../assets/fonts/Alata-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  return (
    <SignUpProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(setup)" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SignUpProvider>
  );
}

export default RootLayout;
