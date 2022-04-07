import { Comment } from "../models/Comment.model"
import Card from "./Card"
import styles from '../styles/CommentFeed.module.css'
import Avatar from "./Avatar"
import Link from "next/link"
import { useRouter } from "next/router"

const Comment = ({ comment }: any) => {
  const router = useRouter()

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