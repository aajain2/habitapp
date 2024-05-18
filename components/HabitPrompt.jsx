import { View, Text, Image } from 'react-native'
import CustomButton from './buttons/CustomButton'
import gifs from '../constants/gifs'

const HabitPrompt = ({
  prompt
}) => {
  return (
    <View className="items-center">
      <Image
        className="w-14 h-14 mb-4"
        source={gifs.exclaim}
      />

      <Text className="text-white text-base w-52 text-center">{prompt}</Text>

      <CustomButton 
        containerStyles="w-52 h-16 bg-white/50 border-2 border-white mt-6"
        textStyles="w-32 text-center"
        title="Complete your habit for today"
      />
    </View>
  )
}

export default HabitPrompt