import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export const validatePasswordConfirm = (password: string, confirmation: string) => {
  return password === confirmation && password.length > 6 ? 'valid' : 'neutral'
}

export const validatePassword = (password: string) => {
  return password.length > 6 ? 'valid' : 'neutral'
}

export const validateUsername = async (username: string) => {
  const length = username.length

  if (length < 3 || length > 25 || username === 'set' || username === 'edit') {
    return 'neutral'
  }
  else {
    const ref = collection(db, 'users')
    const q = query(ref, where('username', '==', username))
    const snap = await getDocs(q)
    const exists = snap.size > 0

    return exists ? 'error' : 'valid'
  }
}