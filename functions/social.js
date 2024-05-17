const { getFirestore } = require('firebase-admin/firestore');

/**
 * Manages social features such as adding and removing friends, handling friend requests,
 * and maintaining the social graph of the application.
 */
const db = getFirestore();

exports.addFriend = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.');
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

exports.removeFriend = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.');
  const { targetUserId } = data;
  const userId = context.auth.uid;

  const friendRef = db.collection('Users').doc(userId).collection('Friends').doc(targetUserId);
  await friendRef.delete();

  return { message: "Friend removed successfully." };
};

exports.acceptFriendRequest = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.');
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

exports.rejectFriendRequest = async (data, context) => {
  if (!context.auth) throw new Error('Authentication required.');
  const { requesterId } = data;
  const targetUserId = context.auth.uid;

  await db.collection('Users').doc(targetUserId).collection('Friends').doc(requesterId).delete();
  await db.collection('Users').doc(requesterId).collection('Friends').doc(targetUserId).delete();

  return { message: "Friend request rejected successfully." };
};
