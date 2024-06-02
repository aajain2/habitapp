import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const HabitCard = ({
  name,
  title,
  subtitle,
  imageURI,
  selected,
  setSelected,
  prompts
}) => {
  const handlePress = (name, selected) => {
    if (selected && name === selected.habit) {
      setSelected(null)
    } else {
      setSelected({
        habit: name,
        habitDescription: title,
        prompts: prompts
      })
    }
  }

  return (
    <TouchableOpacity 
      className={`bg-white/30 rounded-lg border-2 border-transparent ${name === selected?.habit && "border-white"}`}
      onPress={() => handlePress(name, selected)}
    >
      <View className="flex-row w-[90vw] h-20 items-center justify-center">
        <View>
          <Text className="text-white font-inter-bold text-lg">{title}</Text>
          <Text className="text-white font-inter-regular text-xs w-52 mb-1">{subtitle}</Text>
        </View>

        <Image 
          className="w-[76px] h-[50px]"
          source={{
            uri: imageURI
          }}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  )
}

export default HabitCard