import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddFriendButton from '../buttons/AddFriendButton'
import ProfilePicture from '../ProfilePicture'
import { AntDesign } from '@expo/vector-icons'
import AcceptFriendButton from '../buttons/AcceptFriendButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { requestFriend, unrequestFriend } from '../../functions/friends'
import { removeElementByValue } from '../../util/removeElementByValue'

const ProfileCard = ({
  isAcceptRequestCard,
  accepted,
  handleAccept,
  firstName,
  lastName,
  username,
  profilePicture,
  uid,
  hasRemoveButton,
  handleRemoveFriend,
  hideActionButton
}) => {
  const { user, setUser } = useGlobalContext()
  const [status, setStatus] = useState("add")

  useEffect(() => {
    if (user.friends.includes(uid)) {
      setStatus("friends")
    } else if (user.outgoingRequests.includes(uid)) {
      setStatus("requested")
    } else {
      setStatus("add")
    }
  }, [])

  const handleAdd = () => {
    if (status === "add") {
      requestFriend(user.uid, uid)
      .then(() => {
        user.outgoingRequests.push(uid)
        setStatus("requested")
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
    } else if (status === "requested") {
      unrequestFriend(user.uid, uid)
        .then(() => {
          const newArray = removeElementByValue(user.outgoingRequests, uid)
          setUser({
            ...user,
            outgoingRequests: newArray
          })
          setStatus("add")
        })
        .catch((e) => {
          Alert.alert(e.message)
        })
    }
  }

  return (
    <View className="flex-row my-1">
      <ProfilePicture 
        source={profilePicture}
      />
      
      <View className="justify-center ml-2 mr-auto">
        <Text className="font-inter-medium text-sm">{firstName} {lastName}</Text>
        <Text className="font-inter-regular text-xs">@{username}</Text>
      </View>

      {!hideActionButton && 
        <View className="justify-center">
          {isAcceptRequestCard ? 
            <AcceptFriendButton accepted={accepted} handleAccept={handleAccept} /> : 
            <AddFriendButton friendStatus={status} handleAdd={handleAdd} />
          }
        </View>
      }

      {hasRemoveButton && 
        <TouchableOpacity 
          className="flex justify-center items-center ml-2"
          onPress={handleRemoveFriend}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      }
    </View>
  )
}

export default ProfileCard