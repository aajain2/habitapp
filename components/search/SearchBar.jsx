import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ProfileCard from './ProfileCard'
import { useState } from 'react';
import CustomLink from '../CustomLink'

const dummyData = [
  {
    id: 0,
    name: "Joseph",
    username: "joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 1,
    name: "Kyle",
    username: "kylinator",
    profilePicture: "https://picsum.photos/200",
    friends : true,
    requested: false
  },
  {
    id: 2,
    name: "Meow",
    username: "arf",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 3,
    name: "Woof",
    username: "bowwow",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 4,
    name: "JosHulloeph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 5,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 6,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 7,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 8,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  },
  {
    id: 9,
    name: "Joseph",
    username: "Joestar",
    profilePicture: "https://picsum.photos/200",
    friends : false,
    requested: true
  }
]

const SearchBar = ({
  seeMore = false,
  placeholder,
  containerStyles,
}) => {
  const [query, setQuery] = useState("")

  return (
    <View className={containerStyles}>
      <View 
        className={`w-[90vw] border-2 p-4 border-white bg-white/30 
                    ${query !== "" ? "rounded-3xl" : "rounded-full"}`
                  }
      >
        <View className="flex-row w-full gap-1">
          <AntDesign name="search1" size={24} color="white" />

          <TextInput
            autoCapitalize={false}
            autoCorrect={false}
            autoComplete={false}
            className="flex-grow"
            placeholder={placeholder}
            onSubmitEditing={() => console.log(search)}
            value={query}
            onChangeText={(e) => setQuery(e)}
          />
        </View>

        {query !== "" && 
          <View className="">
            <View className="border-white border-b-2 my-2"></View>

            <FlatList 
              className="h-36"
              data={dummyData}
              renderItem={({ item }) => 
                <TouchableOpacity activeOpacity={1}>
                  <ProfileCard
                    name={item.name}
                    username={item.username}
                    friendStatus={item.friends ? "friends" : item.requested ? "requested" : "add"}
                    handleAdd={() => {}}
                    profilePicture={item.profilePicture}
                  />
                </TouchableOpacity>
              }
              keyExtractor={(item) => item.id}
            />

            {seeMore && 
              <CustomLink 
                title={
                  <View>
                    <Text>See more... <AntDesign name="right" size={12} color="black" /></Text>
                  </View>
                }
                containerStyles="mt-1 w-fit ml-auto"
                handlePress={() => console.log("Pressed")}
              />
            }
          </View>
        }
      </View>
    </View>
  )
}

export default SearchBar