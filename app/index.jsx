import { router } from 'expo-router'
import { SafeAreaView } from 'react-native';
import CustomButton from '../components/buttons/CustomButton';

const App = () => {
  return (
    <SafeAreaView className="flex justify-center items-center h-full">
      <CustomButton 
        title="Sign Up"
        handlePress={() => {
          router.push("/home")
        }}
      />
    </SafeAreaView>
  )
}

export default App
