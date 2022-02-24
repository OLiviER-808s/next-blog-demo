import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';

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