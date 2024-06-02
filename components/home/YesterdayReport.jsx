import { View, Text, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getReport } from '../../firebase/report'

const YesterdayReport = ({
  blurred
}) => {
  const { user } = useGlobalContext()
  const [slackers, setSlackers] = useState([])

  useEffect(() => {
    getReport(user.friends)
      .then((slackers) => {
        setSlackers(slackers)
        console.log(slackers)
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
              source={{
                uri: item.avatar
              }}
            />
            <Text className="text-center mt-2 text-xs font-inter-bold">
              {item.username}
            </Text>
          </View>
        }
        ListEmptyComponent={() => {
          return (
            <View className="h-24 w-[90vw] flex items-center justify-center">
              <Text className="font-inter-bold text-base">Good going!</Text>
              <Text className="font-inter-bold text-sm">All your friends completed their habit yesterday.</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

export default YesterdayReport