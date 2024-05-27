import { Image, KeyboardAvoidingView, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'

const AddCommentInput = () => {
  const [comment, setComment] = useState("")

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
              onPress={() => console.log("Added comment:", comment)}
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