import { Alert, Image, Keyboard, KeyboardAvoidingView, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
import { useGlobalContext } from '../context/GlobalProvider'
import { addComment } from '../firebase/comments'

const AddCommentInput = ({
  setComments,
  postId
}) => {
  const { user } = useGlobalContext()
  const [comment, setComment] = useState("")

  const handleComment = () => {
    if (comment !== "") {
      addComment(user.uid, comment, postId)
        .then((comments) => {
          setComments(comments)
          Keyboard.dismiss()
          setComment("")
        })
        .catch((e) => {
          Alert.alert(e.message)
        })
    } else {
      Alert.alert("Please include text in your comment")
    }
    
  }

  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
          <View className="border-t border-light-gray/50 flex-row items-center">
            <TextInput
              className="font-inter-regular p-4 flex-grow" 
              placeholder="Add a comment..."
              placeholderTextColor="text-light-gray"
              value={comment}
              onChangeText={setComment}
            />

            <TouchableOpacity
              disabled={comment === ""}
              onPress={handleComment}
            >
              <Image 
                className={`w-8 h-8 mr-4 ${comment === "" && "opacity-20"}`}
                source={icons.sendIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default AddCommentInput