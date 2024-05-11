import { useFonts } from "expo-font"
import { Slot } from "expo-router"

const RootLayout = () => {
  const[fontsLoaded, error] = useFonts({
    "Alata-Regular": require("../assets/fonts/Alata-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  return (
    <Slot />
  );
}

export default RootLayout;
