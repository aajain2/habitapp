import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="h-full">
      <View>
        <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
      </View>

      <View className="flex items-center justify-center h-full">
        <Text className="font-inter-bold text-lg">What's your name?</Text>
        <Text className="font-inter-regular text-xs">First and Last Please!</Text>
        <Text>Input</Text>
        <CustomButton 
          title="Next"
        />
      </View>
    </SafeAreaView>
  );
}
