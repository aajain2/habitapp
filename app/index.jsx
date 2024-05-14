import { router } from 'expo-router'
import { SafeAreaView } from 'react-native';
import SignUpButton from '../components/SignUpButton';

const App = () => {
  return (
    <SafeAreaView className="flex justify-center items-center h-full">
      <SignUpButton 
        title="Sign Up"
        handlePress={() => {
          router.push("/habit-setup")
        }}
      />
    </SafeAreaView>
  )
}

export default App
