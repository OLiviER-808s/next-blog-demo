import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
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

export const useUsernameCheck = async (username: string) => {
  const ref = collection(db, 'users')
  const q = query(ref, where('username', '==', username))

  const docs = await getDocs(q)
  
  return docs.size < 1
}

export const useEmailCheck = async (email: string) => {
  const ref = collection(db, 'users')
  const q = query(ref, where('email', '==', email))

  const docs = await getDocs(q)

  return docs.size < 1
}

export const useLogout = () => {
  return async () => {
    signOut(auth)
  }
}