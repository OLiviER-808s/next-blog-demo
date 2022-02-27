import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { db, timestamp } from "./firebase"

export const deletePost = async (id: string) => {
  const router = useRouter()

  const ref = doc(db, `posts/${id}`)
  await deleteDoc(ref)

  if (router.pathname === '/post/[id]') router.push('/')
}

export const publishPost = async (id: string) => {
  const ref = doc(db, `posts/${id}`)

  await updateDoc(ref, { state: 'posted', createdAt: timestamp() })
}