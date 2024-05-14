import { View, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import ProfileCard from './ProfileCard'

const SearchBar = ({
  isSearching = true,
  placeholder,
  containerStyles,
}) => {
  return (
    <View 
      className={`w-[90vw] border-2 ${isSearching ? "rounded-3xl" : "rounded-full"} p-4 border-white bg-white/30 ${containerStyles}`}
    >
      <View className="flex-row w-full border">
        <AntDesign name="search1" size={24} color="white" />

        <TextInput
          autoCapitalize={false}
          autoCorrect={false}
          autoComplete={false}
          className="flex-grow" 
          placeholder={placeholder}
          onSubmitEditing={() => console.log("Test")}
        />
      </View>

      <ProfileCard />
    </View>
    
  )
}

export default SearchBar