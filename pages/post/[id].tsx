import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { db, postToJSON } from "../../lib/firebase";

const PostPage: NextPage = () => {
  return (
    <div></div>
  )
}

export async function getServerSideProps({ query }: any) {
  const { id } = query

  const ref = doc(db, `posts/${id}`)
  const d = await getDoc(ref)
  const post = { ...d.data(), id: d.id }

  const post_prop = postToJSON(post)

  return {
    props: {
      post: post_prop
    }
  }
}

export default PostPage