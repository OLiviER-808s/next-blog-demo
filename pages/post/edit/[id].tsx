import { NextPage } from "next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Editor from "../../../components/Editor";
import Textbox from "../../../components/Textbox";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../lib/AuthProvider";
import AuthCheck from "../../../lib/AuthCheck";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Post from "../../../models/Post.model";

const EditPost: NextPage = ({ id }: any) => {
  const [title, setTitle] = useState('')
  const editor: any = useRef(null)

  const [error, setError] = useState(false)

  const user = useContext(AuthContext)
  const router = useRouter()

  const [postData] = useDocumentData(doc(db, `posts/${id}`))
  const post: Post = { ...postData, id: id }

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
        state: post.state
      }

      const ref = doc(db, `posts/${post.id}`)
      await updateDoc(ref, data)

      router.push('/')
    }
  }

  useEffect(() => {
    if (post) {
      setTitle(post.title || '')
      editor.current.querySelector('#content').innerHTML = post.content
    }
  }, [post])

  return (
    <AuthCheck>
      <div style={{'width': '100%'}}>
        <Card>
          <Textbox value={title} onChange={updateTitle} big fullWidth placeholder="Title" type="text" 
          error_msg="Post needs a title" validationState={error ? 'error' : 'neutral'} />

          <div ref={editor}>
            <Editor />
          </div>

          <div className="reverse-btn-row">
            <div className="spacer"></div>
            <Button secondary onClick={() => router.back()}>Cancel</Button>
            <Button color="green" onClick={() => editPost()}>Edit Post</Button>
          </div>
        </Card>
      </div>
    </AuthCheck>
  )
}

export async function getServerSideProps({ query }: any) {
  const { id } = query

  return {
    props: {
      id: id
    }
  }
}

export default EditPost