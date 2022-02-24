import { addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '../lib/AuthProvider'
import { db, timestamp } from '../lib/firebase'
import { Comment } from '../models/Comment.model'
import styles from '../styles/AddComment.module.css'
import Button from './Button'
import Card from './Card'
import Textarea from './Textarea'

const AddComment = (props: any) => {
  const [comment, setComment] = useState('')
  const user = useContext(AuthContext)
  const router = useRouter()

  const close = () => {
    setComment('')
    props.close()
  }

  const uploadComment = () => {
    if (comment) {
      const ref = collection(db, 'comments')
      const id: any = router.query.id
      
      const data: Comment = {
        content: comment,
        authorname: user.username,
        postID: id,
        createdAt: timestamp()
      }

      addDoc(ref, data)
    }
    props.close()
  }

  return (
    <>
      {props.show && (
        <div className="center">
          <div className={styles.popover}>
            <Card>
              <form>
                <Textarea value={comment} onChange={setComment} 
                height={8} placeholder="Write a comment..." />

                <div className="btn-row">
                  <Button color="green" onClick={uploadComment}>Post</Button>
                  <Button secondary onClick={close}>Cancel</Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

export default AddComment