import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AcceptFriendButton = ({
  accepted,
  handleAccept,
}) => {
  return (
    <TouchableOpacity 
      className={`w-24 h-6 rounded-full justify-center items-center ${accepted ? "bg-blue/80" : "bg-blue"}`}
      onPress={handleAccept}
    >
      <Text className="font-poppins-medium text-white text-xs">
        {accepted ? "ACCEPTED" : "ACCEPT"}
      </Text>
    </TouchableOpacity>
  )
}

export default AcceptFriendButton