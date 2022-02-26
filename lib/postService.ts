import { deleteDoc, doc } from "firebase/firestore"
import { useRouter } from "next/router"
import { db } from "./firebase"

export const deletePost = async (id: string) => {
  const router = useRouter()

  const ref = doc(db, `posts/${id}`)
  await deleteDoc(ref)

  if (router.pathname === '/post/[id]') router.push('/')
}