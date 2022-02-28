import Link from 'next/link'
import Post from '../models/Post.model'
import styles from '../styles/PostFeed.module.css'
import Card from './Card'
import LikeIcon from '../public/icons/like18.svg'
import DislikeIcon from '../public/icons/dislike18.svg'
import DeleteIcon from '../public/icons/delete18.svg'
import EditIcon from '../public/icons/edit18.svg'
import { useContext, useState } from 'react'
import { AuthContext } from '../lib/AuthProvider'
import HoldButton from './HoldButton'
import DeleteBar from './DeleteBar'
import { usePostDelete, publishPost } from '../lib/postService'
import { useRouter } from 'next/router'
import Button from './Button'

const Post = ({ post }: any) => {
  const words = post.content.split(' ').length
  const mins = (words / 100 + 1).toFixed(0)

  const user = useContext(AuthContext)
  const isUserPost = post.authorname === user?.username

  const [fill, setFill] = useState(0)
  const [show, setShow] = useState(true)
  const deletePost = usePostDelete(post.id)

  const router = useRouter()
  const editPost = () => router.push(`/post/edit/${post.id}`)

  return (
    <>
    {show && <div className={styles.post}>
      <Card>
        <p>by <Link href={`/profile/${post.authorname}`}>{ post.authorname }</Link></p>

        <div className={styles.row}>
          <h2 className={styles.title}>
            <Link href={`/post/${post.id}`}>{ post.title }</Link>
          </h2>

          <div className="spacer"></div>

          {post.state === 'draft' ? 
          <Button color="green" onClick={() => {
            publishPost(post.id)
            setShow(false)
          }}>Publish</Button> 
          : ''}
        </div>

        <div className={styles.footer}>
          <p>{words} words. {mins} min read</p>

          <div className="spacer"></div>

          {isUserPost && <>
            <div className={styles.edit}>
              <button className='icon-btn edit-btn' onClick={editPost}>
                <EditIcon />
              </button>
            </div>
            <div className={styles.delete}>
              <HoldButton speed={20} setFill={setFill} onEnd={() => {
                deletePost()
                setShow(false)
              }}>
                <button className="icon-btn delete-btn">
                  <DeleteIcon />
                </button>
              </HoldButton>
            </div>
          </>}
          <p className={styles.count}>{ post.likeCount } <LikeIcon /></p>
          <p className={styles.count}>{ post.dislikeCount } <DislikeIcon /></p>
        </div>
      </Card>

      <div className="center">
        <DeleteBar progress={fill}/>
      </div>
    </div>}
    </>
  )
}

const PostFeed = ({ posts }: any) => {
  return (
    <div className={styles.feed}>
      {posts.map((post: Post) => {
        return <Post key={post.id} post={post}></Post>
      })}

      {posts.length === 0 && <p>No Posts</p>}
    </div>
  )
}

export default PostFeed