import { addDoc, collection } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Editor from "../../components/Editor";
import Textbox from "../../components/Textbox";
import AuthCheck from "../../lib/AuthCheck";
import { AuthContext } from "../../lib/AuthProvider";
import { db, timestamp } from "../../lib/firebase";
import Post from "../../models/Post.model";

const CreatePage: NextPage = () => {
  const [title, setTitle] = useState('')
  const editor: any = useRef(null)

  const [error, setError] = useState(false)

  const user = useContext(AuthContext)
  const router = useRouter()

  const updateTitle = (val: string) => {
    setTitle(val)
    if (!!title) setError(false)
  }

  const uploadPost = async (state: 'posted' | 'draft') => {
    if (!title) {
      setError(true)
    }
    else {
      const content = editor.current.querySelector('#content').innerHTML

      const post: Post = {
        likeCount: 0,
        dislikeCount: 0,
        content: content ? String(content) : ' ',
        title: title,
        state: state,
        authorname: user.username,
        createdAt: timestamp()
      }

      const ref = collection(db, 'posts')
      await addDoc(ref, post)

      router.push('/')
    }
  }

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
            <Button secondary onClick={() => uploadPost('draft')}>Draft</Button>
            <Button color="green" onClick={() => uploadPost('posted')}>Upload Post</Button>
          </div>
        </Card>
      </div>
    </AuthCheck>
  )
}

export default CreatePage