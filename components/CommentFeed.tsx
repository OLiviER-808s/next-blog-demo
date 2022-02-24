import { Comment } from "../models/Comment.model"
import Card from "./Card"
import styles from '../styles/CommentFeed.module.css'
import Avatar from "./Avatar"

const Comment = ({ comment }: any) => {
  return (
    <div className={styles.comment}>
      <Card>
        <div className={styles.row}>
          <div>
            <Avatar src={comment.photo} width={3}/>
          </div>
          <div>
            <h4>{ comment.authorname }</h4>
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
    </div>
  )
}

export default CommentFeed