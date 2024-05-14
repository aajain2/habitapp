import { View, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({
  placeholder,
  containerStyles,
}) => {
  return (
    <View className={`w-[90vw] border-2 rounded-full p-4 border-white bg-white/30 flex-row space-x-2 ${containerStyles}`}>
      <AntDesign name="search1" size={24} color="white" />

      <TextInput
        autoCapitalize={false}
        autoCorrect={false}
        autoComplete={false}
        className="w-full" 
        placeholder={placeholder}
        onSubmitEditing={() => console.log("Test")}
      />
    </View>
  )
}

export default SearchBar