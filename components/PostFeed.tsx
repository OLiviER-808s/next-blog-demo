import Link from 'next/link'
import Post from '../models/Post.model'
import styles from '../styles/PostFeed.module.css'
import Card from './Card'
import LikeIcon from '../public/icons/like18.svg'
import DislikeIcon from '../public/icons/dislike18.svg'

const Post = ({ post }: any) => {
  return (
    <div className={styles.post}>
      <Card>
        <h3 className={styles.title}>
          <Link href={`/post/${post.id}`}>{ post.title }</Link>
        </h3>

        <div className={styles.footer}>
          <p>by <Link href={`/profile/${post.authorname}`}>{ post.authorname }</Link></p>

          <div className="spacer"></div>

          <p className={styles.count}>{ post.likeCount } <LikeIcon /></p>
          <p className={styles.count}>{ post.dislikeCount } <DislikeIcon /></p>
        </div>
      </Card>
    </div>
  )
}

const PostFeed = ({ posts }: any) => {
  return (
    <div className={styles.feed}>
      {posts.map((post: Post) => {
        return <Post key={post.id} post={post}></Post>
      })}
    </div>
  )
}

export default PostFeed