import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import SignUpButton from '../components/SignUpButton';
import SignUpInput from '../components/SignUpInput';

export default function App() {
  return (
    <SafeAreaView className="h-full">
      <View>
        <Text className="text-3xl text-orange font-alata-regular text-center">TRABIT</Text>
      </View>

      <View className="flex items-center justify-center h-full">
        <Text className="font-inter-bold text-lg">What's your name?</Text>
        <Text className="font-inter-regular text-xs">First and Last Please!</Text>

        <SignUpInput 
          containerStyles="my-2 mt-12"
          title="Test"
          placeholder="Test"
        />
        
        <SignUpButton 
          handlePress={() => {}}
          title="Next"
          isLoading={true}
          containerStyles="mt-32"
        />
      </View>
    </SafeAreaView>
  );
}
