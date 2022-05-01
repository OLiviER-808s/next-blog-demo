import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export const validateEmail = async (email: string) => {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!email.match(re)) {
    return 'neutral'
  }
  else {
    const ref = collection(db, 'users')
    const q = query(ref, where('email', '==', email))
    const snap = await getDocs(q)
    const exists = snap.size > 0
    return exists ? 'error' : 'valid'
  }
}

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
    const ref = doc(db, `usernames/${username}`)
    const d = await getDoc(ref)
    const exists = d.exists()

    return exists ? 'error' : 'valid'
  }
}