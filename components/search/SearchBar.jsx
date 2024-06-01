import { View, TextInput, FlatList, TouchableOpacity, Text, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ProfileCard from './ProfileCard'
import CustomLink from '../CustomLink'
import { router } from 'expo-router';
import { useQueryContext } from '../../context/QueryProvider';
import EmptyResults from './EmptyResults';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../firebase/friends';

const SearchBar = ({
  seeMore = false,
  placeholder,
  containerStyles,
  styles
}) => {
  const { query, setQuery } = useQueryContext()
  const [currentUsers, setCurrentUsers] = useState([])
  const [searchResult, setSearchResult] = useState([])
  
  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setCurrentUsers(data)
        setSearchResult(data)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }, [])
  
  useEffect(() => {
    const searchResult = currentUsers.filter((user) => user.username.includes(query))
    setSearchResult(searchResult)
  }, [query])

  return (
    <View className={containerStyles}>
      <View 
        className={`w-[90vw] border-2 p-4 border-white bg-white/30 
                    ${query !== "" ? "rounded-3xl" : "rounded-full"} 
                    ${styles}`
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
            value={query}
            onChangeText={(e) => setQuery(e)}
          />

          {query !== "" && 
            <TouchableOpacity onPress={() => setQuery("")}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          }
        </View>

        {query !== "" && 
          <View>
            <View className="border-white border-b-2 my-4"></View>

            <FlatList 
              className={seeMore ? "h-36" : "h-full"}
              data={searchResult}
              renderItem={({ item }) => 
                <TouchableOpacity activeOpacity={1}>
                  <ProfileCard
                    firstName={item.firstName}
                    lastName={item.lastName}
                    username={item.username}
                    profilePicture={item.avatar}
                    uid={item.uid}
                  />
                </TouchableOpacity>
              }
              keyExtractor={(item) => item.uid}
              ListEmptyComponent={
                <EmptyResults />
              }
            />

            {seeMore && 
              <CustomLink 
                title={
                  <View>
                    <Text>See more... <AntDesign name="right" size={12} color="black" /></Text>
                  </View>
                }
                containerStyles="mt-1 w-fit ml-auto"
                handlePress={() => router.navigate("friend-search")}
              />
            }
          </View>
        }
      </View>
    </View>
  )
}

export default SearchBar