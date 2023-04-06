import { addDoc, collection } from 'firebase/firestore'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '../lib/AuthProvider'
import { db, timestamp } from '../lib/firebase'
import { Comment } from '../models/Comment.model'
import styles from '../styles/AddComment.module.css'
import Button from './Button'
import Card from './Card'
import Textarea from './Textarea'
import { CommentAddedToast } from '../lib/toast'

const slideUp = {
  hidden: {
    y: '100vh',
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.25
    }
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
}

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
        photo: user.photo,
        postID: id,
        uid: user.uid,
        createdAt: timestamp()
      }

      addDoc(ref, data)
    }
    props.close()
    setComment('')

    CommentAddedToast()
  }

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
      {props.show && (
        <div className="center">
          <motion.div className={styles.popover} onClick={(e) => e.stopPropagation()}
          variants={slideUp} initial="hidden" animate="visible" exit="exit">
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AddComment