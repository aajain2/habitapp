import { View, Text, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'

// for avoiding double initialization
if (!firebase.apps.length) {
  firebase.initializeApp({});
} else {
  firebase.app();
}

const YesterdayReport = ({ blurred }) => {
  const [nonCompleters, setNonCompleters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const nonCompletersRef = db.collection('nonCompleters');
      const today = new Date();
      const yesterday = new Date(today.setDate(today.getDate() - 1));
      const dateString = yesterday.toISOString().split('T')[0];

      const querySnapshot = await nonCompletersRef.where('date', '==', dateString).get();
      const usersData = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const userId = doc.data().userId;
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          return {
            id: userDoc.id,
            username: userData.firstName,
            profilePicture: userData.avatar || 'https://picsum.photos/200',
            name: userData.firstName
          };
        }
        return null;
      }));

      setNonCompleters(usersData.filter(user => user!== null));
    };

    fetchData();
  }, []);

  return (
    <View className="my-4 mx-4">
      <Text className="text-xl font-inter-bold">
        Yesterday’s Report
      </Text>
      <Text className="font-inter-bold">
        These people did not complete their habit.
      </Text>

      <FlatList 
        data={nonCompleters}
        className="py-4"
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => 
          <View className="mx-2">
            <Image 
              blurRadius={blurred ? 20 : 0}
              className="w-16 h-16 rounded-full"
              source={{
                uri: item.profilePicture
              }}
            />
            <Text className="text-center mt-2 text-xs font-inter-bold">
              {item.username}
            </Text>
          </View>
        }
      />
    </View>
  )
}

export default YesterdayReport;