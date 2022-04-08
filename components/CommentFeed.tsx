import { Comment } from "../models/Comment.model"
import Card from "./Card"
import styles from '../styles/CommentFeed.module.css'
import DeleteIcon from '../public/icons/delete24.svg'
import Avatar from "./Avatar"
import Link from "next/link"
import { useRouter } from "next/router"
import IconButton from "./IconButton"
import { useContext } from "react"
import { AuthContext } from "../lib/AuthProvider"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../lib/firebase"

const Comment = ({ comment }: any) => {
  const router = useRouter()
  const user = useContext(AuthContext)

  const deleteComment = async () => {
    const ref = doc(db, `comments/${comment.id}`)
    deleteDoc(ref)
  }

  return (
    <div className={styles.comment}>
      <Card>
        <div className={styles.row}>
          <div onClick={() => router.push(`/profile/${comment.authorname}`)}>
            <Avatar src={comment.photo} width={3}/>
          </div>
          <div>
            <h4><Link href={`/profile/${comment.authorname}`}>{ comment.authorname }</Link></h4>
            <p>{ comment.content }</p>
          </div>
          <div className="spacer"></div>
          {user.username === comment.authorname && (
            <div className={styles.delete}>
              <IconButton delete onClick={deleteComment}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

const CommentFeed = ({ comments }: any) => {
  return (
    <div>
      {comments.map((comment: Comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}

      {comments.length === 0 && <p>No comments</p>}
    </div>
  )
}

export default CommentFeed