import { View, Text, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getReport } from '../../firebase/report'
import images from '../../constants/images'
import { BlurView } from 'expo-blur';

const YesterdayReport = ({
  blurred
}) => {
  const { user } = useGlobalContext()
  const [slackers, setSlackers] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setRefreshing(true)

    getReport(user.friends)
      .then((slackers) => {
        setSlackers(slackers)
        setRefreshing(false)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }, [])

  return (
    <View className="my-4 mx-4">
      <Text className="text-xl font-inter-bold">
        Yesterday’s Report
      </Text>
      <Text className="font-inter-bold">
        These people did not complete their habit.
      </Text>

      <FlatList 
        data={slackers}
        className="pt-4"
        keyExtractor={(item) => item.uid}
        horizontal
        renderItem={({ item }) => 
          <View className="mx-2 h-24">
            <Image 
              blurRadius={blurred ? 20 : 0}
              className="w-16 h-16 rounded-full"
              source={item.avatar ? { uri: item.avatar} : images.avatar}
            />
            <Text className="text-center mt-2 text-xs font-inter-bold">
              {item.username}
            </Text>
            <BlurView className="h-10 -top-6" intensity={blurred ? 10 : 0} />
          </View>
        }
        ListEmptyComponent={() => {
          return (
            <View className="h-24 w-[90vw] flex items-center justify-center">
              {!refreshing &&
                <>
                  <Text className="font-inter-bold text-base">Good going!</Text>
                  <Text className="font-inter-regular text-sm">All your friends completed their habit yesterday.</Text>
                </>
              }
            </View>
          )
        }}
      />
    </View>
  )
}

export default YesterdayReport