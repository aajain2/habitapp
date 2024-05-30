import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AddFriendButton = ({
  friendStatus,
  handleAdd,
}) => {
  return (
    <TouchableOpacity
      disabled={friendStatus === "friends"}
      className={`w-24 h-6 rounded-full justify-center items-center ${friendStatus === "add" ? "bg-blue/80" : "bg-blue"}`}
      onPress={handleAdd}
    >
      <Text className="font-poppins-medium text-white text-xs">
        {friendStatus === "add" ? "ADD" : 
         friendStatus === "requested" ? "REQUESTED" : "FRIENDS"}
      </Text>
    </TouchableOpacity>
  )
}

export default AddFriendButton