import { collection, getDocs } from "firebase/firestore";
import { NextPage } from "next";
import { db } from "../../lib/firebase";

const ProfilePage: NextPage = () => {
  return (
    <div>hi</div>
  )
}

export async function getStaticProps() {
  return {
    props: { posts: [] }
  }
}

export async function getStaticPaths() {
  const ref = collection(db, 'users')
  const docs = await getDocs(ref)
  
  const paths = docs.docs.map(doc => {
    return { params: { uid: doc.id } }
  })

  return {
    paths,
    fallback: false
  }
}

export default ProfilePage