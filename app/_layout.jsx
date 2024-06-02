import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import 'react-native-reanimated'
import { useAssets } from 'expo-asset'

import SignUpProvider from "../context/SignUpProvider"
import GlobalProvider from "../context/GlobalProvider"

const RootLayout = () => {
  const [assets, assetsError] = useAssets([
                                            require("../assets/videos/blue-orange-background.mov"),
                                            require("../assets/videos/green-background.mov"),
                                            require("../assets/gifs/rainbow-rabbit.gif")
                                          ]);

  const[fontsLoaded, fontsError] = useFonts({
    "Alata-Regular": require("../assets/fonts/Alata-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf")
  });

  return (
    <GlobalProvider>
      <SignUpProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(setup)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SignUpProvider>
    </GlobalProvider>
  );
}

export default RootLayout;
