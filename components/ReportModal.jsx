import { View, Text, Alert, Modal, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { reportPost } from '../firebase/post'
import { AntDesign } from '@expo/vector-icons'
import ThinCustomButton from './buttons/ThinCustomButton'
import images from '../constants/images'

const ReportModal = ({
  showModal,
  setShowModal,
  postId
}) => {
  const [reported, setReported] = useState(false)

  const handleReport = () => {
    reportPost(postId)
      .then(() => {
        setReported(true)
      })
      .catch((e) => {
        Alert.alert(e.message)
      })
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={showModal}
    >
      <View className="w-full h-full flex items-center justify-center">
        <View className="bg-black/80 w-72 h-36 rounded-2xl shadow-xl flex items-center justify-center">
          <TouchableOpacity 
            className="absolute top-3 left-3"
            onPress={() => {
              setShowModal(false)
            }}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>

          {!reported ? 
            <>
              <Image
                className="w-8 h-8 mb-2"
                resizeMode="contain"
                source={images.caution}
              />

              <Text className="text-white font-inter-regular text-base">Would you like to report this post?</Text>

              <ThinCustomButton
                containerStyles="mt-4 py-0.5 px-6 bg-transparent border border-blue"
                title="Report Post"
                textStyles="text-blue"
                handlePress={handleReport}
              />
            </>
          : 
            <>
              <Text className="text-white font-inter-regular text-base">Post has been reported</Text>
            </>
          }
        </View>
      </View>
    </Modal>
  )
}

export default ReportModal