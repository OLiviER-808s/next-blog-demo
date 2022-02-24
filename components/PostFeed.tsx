import Link from 'next/link'
import Post from '../models/Post.model'
import styles from '../styles/PostFeed.module.css'
import Card from './Card'
import LikeIcon from '../public/icons/like18.svg'
import DislikeIcon from '../public/icons/dislike18.svg'

const Post = ({ post }: any) => {
  const words = post.content.split(' ').length
  const mins = (words / 100 + 1).toFixed(0);

  return (
    <div className={styles.post}>
      <Card>
        <p>by <Link href={`/profile/${post.authorname}`}>{ post.authorname }</Link></p>

        <h2 className={styles.title}>
          <Link href={`/post/${post.id}`}>{ post.title }</Link>
        </h2>

        <div className={styles.footer}>
          <p>{words} words. {mins} min read</p>

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