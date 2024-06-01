import { storage, firestore, auth } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getBlobFromURI } from '../util/getBlobFromURI';
import { collection, doc, documentId, getDoc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { splitArrayByTen } from '../util/splitArrayByTen';
import { convertFirebaseTimestamp } from '../util/convertFirebaseTimestamp';

const completePost = async (uri, habit, username, avatar, prompt) => {
  const user = auth.currentUser 

  try {
    await updateDoc(doc(firestore, "users", user.uid), {
      completedToday: true,
      streak: increment(1),
      completedCount: increment(1)
    })

    await setDoc(doc(firestore, "posts", user.uid), {
      postURI: uri,
      habit: habit,
      timestamp: new Date(),
      username: username,
      avatar: avatar,
      likes: 0,
      likers: [],
      prompt: prompt,
      comments: [],
      reported: false
    })
  } catch (e) {
    throw new Error(e)
  }
}

export const uploadPost = async (
  uri,
  habit,
  username,
  avatar,
  prompt,
  { onStart, onFinish, onFail }
) => {
  const user = auth.currentUser

  if (!user.uid) {
    throw new Error("Error with user ID")
  }

  const metadata = {
    contentType: 'image/jpg'
  }

  const blob = await getBlobFromURI(uri)

  const storageRef = ref(storage, 'posts/' + user.uid + '.jpg');
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

  onStart()

  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      onFail(error)
    }, 
    async () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        try {
          await completePost(downloadURL, habit, username, avatar, prompt)
          onFinish()
          console.log('File available at', downloadURL);
        } catch (e) {
          throw new Error(e)
        }
      });
    }
  )
}

export const getPost = async (uid) => {
  try {
    const postRef = doc(firestore, "posts", uid)
    const postSnap = await getDoc(postRef)
  
    if (!postSnap.exists()) {
      throw new Error("Post not found, please restart app")
    }

    return {
      ...postSnap.data(),
      uid: postSnap.id,
      timestamp: convertFirebaseTimestamp(postSnap.data().timestamp)
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getFriendsPosts = async (uidList) => {
  try {
    const posts = []
    const nestedUID = splitArrayByTen(uidList)

    for (array in nestedUID) {
      const userRef = collection(firestore, "posts")

      const q = query(userRef, where(documentId(), "in", uidList))
      const querySnapshot = await getDocs(q)
  
      querySnapshot.forEach((doc) => {
        posts.push({
          ...doc.data(),
          uid: doc.id,
          timestamp: convertFirebaseTimestamp(doc.data().timestamp)
        })
      })
    }

    return posts
  } catch (e) {
    throw new Error(e.message)
  } 
}

export const reportPost = async (postId) => {
  try {
    await updateDoc(doc(firestore, "posts", postId), {
      reported: true
    })
  } catch (e) {
    throw new Error(e.message)
  }
}
