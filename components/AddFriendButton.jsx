import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AddFriendButton = ({
  state,
}) => {
  return (
    <TouchableOpacity 
      className={`w-20 h-6 rounded-full justify-center items-center ${state === "add" ? "bg-blue/80" : "bg-blue"}`}
    >
      <Text className="font-poppins-medium text-white text-xs">
        {state === "add" ? "ADD" : state === "requested" ? "REQUESTED" : "FRIENDS"}
      </Text>
    </TouchableOpacity>
  )
}

export default AddFriendButton