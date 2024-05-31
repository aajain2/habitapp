import { storage, firestore } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getBlobFromURI } from '../util/getBlobFromURI';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const completePost = async (uri, uid, habit) => {
  try {
    await updateDoc(doc(firestore, "users", uid), {
      completedToday: true
    })

    console.log("Updated doc")

    await setDoc(doc(firestore, "posts"), {
      uid: uid,
      postURI: uri,
      habit: habit,
      timestamp: new Date()
    })

    console.log("Updated posts")
  } catch (e) {
    throw new Error(e)
  }
}

export const uploadPost = async (
  uri, 
  uid,
  habit,
  { onStart, onFinish, onFail }
) => {
  if (!uid) {
    throw new Error("Error with user ID")
  }

  const metadata = {
    contentType: 'image/jpg'
  }

  const blob = await getBlobFromURI(uri)

  const storageRef = ref(storage, 'posts/' + uid + '.jpg');
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

        console.log("Test before")

        await completePost(downloadURL, uid, habit)

        console.log("Test")


        onFinish()

        console.log("Finished")
        console.log('File available at', downloadURL);
      });
    }
  )
}