import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ProfileCard from './ProfileCard'
import CustomLink from '../CustomLink'
import { router } from 'expo-router';
import { useQueryContext } from '../../context/QueryProvider';
import EmptyResults from './EmptyResults';

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

const dummyEmpty = []

const SearchBar = ({
  seeMore = false,
  placeholder,
  containerStyles,
  styles
}) => {
  const {query, setQuery } = useQueryContext()

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
            onSubmitEditing={() => console.log(search)}
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
              data={dummyEmpty}
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
                handlePress={() => router.push("friend-search")}
              />
            }
          </View>
        }
      </View>
    </View>
  )
}

export default SearchBar