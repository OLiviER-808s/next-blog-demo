import { deleteUser, signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { base64ToBlob } from './not my code';
import { auth, db, storage } from './firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const useUserData = () => {
  const [user] = useAuthState(auth);

  const def: any = null;
  const [userData, setUserData] = useState(def);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = doc(db, `users/${user.uid}`);
      unsubscribe = onSnapshot(ref, d => {
        setUserData({ ...d.data(), uid: d.id });
      });
    }
    else {
      setUserData(null);
    }

    return unsubscribe
  }, [user]);

  return userData
}

export const useLogout = () => {
  return async () => {
    signOut(auth)
  }
}

export const getUserWithUsername = async (username: string) => {
  const ref = collection(db, 'users')
  const q = query(ref, where('username', '==', username))
  const snap = await getDocs(q)
  const doc = snap.docs[0]

  return { ...doc.data(), uid: doc.id }
}

export const getUserPosts = async (username: string) => {
  const ref = collection(db, 'posts')
  const q = query(ref, where('authorname', '==', username), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  const posts = snap.docs.map(post => {
    return { ...post.data(), id: post.id }
  })

  return posts
}

export const useAccountDelete = () => {
  const router = useRouter()

  return async () => {
    const user = auth.currentUser
    
    if (user) {
      // deletes in firebase
      const ref = doc(db, `users/${user?.uid}`)
      deleteDoc(ref)
  
      // deletes in auth
      deleteUser(user)
  
      router.push('/')
    }
  }
}

export const setProfilePic = async (pic: any, uid: string) => {
  const jpegFile64 = pic.replace(/^data:image\/(png|jpeg);base64,/, "");
  const file = base64ToBlob(jpegFile64, 'image/jpeg')
  const r = ref(storage, `profiles/${uid}`)

  console.log(file)
  await uploadBytes(r, file)

  return await getDownloadURL(r)
}