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
  const q = query(ref, where('authorname', '==', username), where('state', '==', 'posted'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  const posts = snap.docs.map(post => {
    return { ...post.data(), id: post.id }
  })

  return posts
}

export const getUserDrafts = async (uid: string) => {
  const ref = collection(db, 'posts')
  const q = query(ref, where('uid', '==', uid), where('state', '==', 'draft'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  const drafts = snap.docs.map(post => {
    return { ...post.data(), id: post.id }
  })

  return drafts
}

export const useAccountDelete = (username: string) => {
  const router = useRouter()

  return async () => {
    const user = auth.currentUser
    const uid = user?.uid
    
    if (user) {
      try {
        // deletes in firebase
        const ref = doc(db, `users/${uid}`)
        await deleteDoc(ref)

        // deltes username
        await deleteDoc(doc(db, `usernames/${username}`))

        // deletes asociated comments
        const cq = query(collection(db, 'comments'), where('uid', '==', uid))
        const c_snap = await getDocs(cq)
        c_snap.forEach(async (c) => await deleteDoc(c.ref))

        // deletes asociated posts
        const pq = query(collection(db, 'posts'), where('uid', '==', uid))
        const p_snap = await getDocs(pq)
        p_snap.forEach(async (p) => await deleteDoc(p.ref))

        // deletes in auth
        await deleteUser(user)
    
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export const setProfilePic = async (pic: any, uid: any) => {
  const jpegFile64 = pic.replace(/^data:image\/(png|jpeg);base64,/, "");
  const file = base64ToBlob(jpegFile64, 'image/jpeg')
  const r = ref(storage, `profiles/${uid}`)

  console.log(file)
  await uploadBytes(r, file)

  return await getDownloadURL(r)
}