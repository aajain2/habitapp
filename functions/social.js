// This file is responsible for managing social interactions within the application, such as
// adding and removing friends, and handling friend requests.

const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

// Sends a friend request from the authenticated user to another user
exports.addFriend = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.'); // Ensures the user is authenticated
  const { targetUserId } = data;
  const userId = context.auth.uid;

  if (userId === targetUserId) {
    throw new Error("Cannot add yourself as a friend.");
  }

  const friendRef = db.collection('Users').doc(userId).collection('Friends').doc(targetUserId);
  await friendRef.set({
    status: 'pending',
    addedOn: new Date()
  });

  return { message: "Friend request sent successfully." };
};

// Removes a friend from the user's friend list
exports.removeFriend = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.'); // Ensures the user is authenticated
  const { targetUserId } = data;
  const userId = context.auth.uid;

  const friendRef = db.collection('Users').doc(userId).collection('Friends').doc(targetUserId);
  await friendRef.delete();

  return { message: "Friend removed successfully." };
};

// Accepts a friend request
exports.acceptFriendRequest = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.'); // Ensures the user is authenticated
  const { requesterId } = data;
  const targetUserId = context.auth.uid;

  const friendUpdate = {
    status: 'accepted',
    acceptedAt: new Date(),
  };

  await db.collection('Users').doc(targetUserId).collection('Friends').doc(requesterId).update(friendUpdate);
  await db.collection('Users').doc(requesterId).collection('Friends').doc(targetUserId).update(friendUpdate);

  return { message: "Friend request accepted successfully." };
};

// Rejects a friend request
exports.rejectFriendRequest = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.'); // Ensures the user is authenticated
  const { requesterId } = data;
  const targetUserId = context.auth.uid;

  await db.collection('Users').doc(targetUserId).collection('Friends').doc(requesterId).delete();
  await db.collection('Users').doc(requesterId).collection('Friends').doc(targetUserId).delete();

  return { message: "Friend request rejected successfully." };
};
