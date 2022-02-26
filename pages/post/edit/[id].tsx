import { NextPage } from "next";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, postToJSON, timestamp } from "../../../lib/firebase";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Editor from "../../../components/Editor";
import Textbox from "../../../components/Textbox";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../lib/AuthProvider";
import Post from "../../../models/Post.model";

const EditPost: NextPage = ({ post }: any) => {
  const [title, setTitle] = useState(post.title)
  const editor: any = useRef(null)

  const [error, setError] = useState(false)

  const user = useContext(AuthContext)
  const router = useRouter()

  const updateTitle = (val: string) => {
    setTitle(val)
    if (!!title) setError(false)
  }

  const editPost = async () => {
    if (!title) {
      setError(true)
    }
    else {
      const content = editor.current.querySelector('#content').innerHTML

      const data: any = {
        content: content ? String(content) : ' ',
        title: title,
        state: post.state,
        authorname: user.username,
      }

      const ref = doc(db, `posts/${post.id}`)
      await updateDoc(ref, data)

      router.push('/')
    }
  }

  useEffect(() => {
    editor.current.querySelector('#content').innerHTML = post.content
  }, [])

  return (
    <div style={{'width': '100%'}}>
      <Card>
        <Textbox value={title} onChange={updateTitle} big fullWidth placeholder="Title" type="text" 
        error_msg="Post needs a title" validationState={error ? 'error' : 'neutral'} />

        <div ref={editor}>
          <Editor />
        </div>

        <div className="reverse-btn-row">
          <div className="spacer"></div>
          <Button secondary onClick={() => router.push('/')}>Cancel</Button>
          <Button color="green" onClick={() => editPost()}>Edit Post</Button>
        </div>
      </Card>
    </div>
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

export default EditPost