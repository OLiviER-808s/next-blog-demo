import { collection, doc, getDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { db, postToJSON } from "../../lib/firebase";
import LikeIcon from '../../public/icons/like36.svg'
import MobileLikeIcon from '../../public/icons/like24.svg'
import DislikeIcon from '../../public/icons/dislike36.svg'
import MobileDislikeIcon from '../../public/icons/dislike24.svg'
import CommentIcon from '../../public/icons/comment36.svg'
import MobileCommentIcon from '../../public/icons/comment24.svg'
import styles from '../../styles/postPage.module.css'
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddComment from "../../components/AddComment";
import useScreenWidth from "../../lib/screen-width";
import { useRouter } from "next/router";
import { AuthContext } from "../../lib/AuthProvider";
import CommentFeed from "../../components/CommentFeed";

const PostPage: NextPage = ({ post }: any) => {
  const contentRef: any = useRef(null)
  const isHandheld = useScreenWidth() < 600
  const router = useRouter()
  const user = useContext(AuthContext)
  let isUserPost: boolean | null

  const [commentBox, setCommentBox] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    // sets article content
    contentRef.current.innerHTML = post.content

    // checks if post belongs to user
    isUserPost = post.authorname === user?.username || null

    // sets comments
    const postID = router.query.id
    const ref = collection(db, 'comments')
    const q = query(ref, where('postID', '==', postID), orderBy('createdAt', 'desc'))
    onSnapshot(q, snap => {
      const c: any = snap.docs.map(d => {
        return { ...d.data(), id: d.id }
      })
      setComments(c)
    })
  }, [])

  return (
    <div className={styles.page}>
      {!isHandheld && <div className={styles.btn_column}>
        <div className={styles.btns}>
          <button className="icon-btn">
            <LikeIcon />
          </button>
          <p>{ post.likeCount }</p>
          <button className="icon-btn">
            <DislikeIcon />
          </button>
          <p>{ post.dislikeCount }</p>
          <button className="icon-btn" onClick={() => setCommentBox(true)}>
            <CommentIcon />
          </button>
          <p>0</p>
        </div>
      </div>}

      <div className={styles.article}>
        <div className={styles.header}>
          <h1>{ post.title }</h1>
          <p>by <Link href={`/profile/${post.authorname}`}>{ post.authorname }</Link></p>
        </div>

        <div ref={contentRef} className={styles.content}></div>

        {isHandheld && (<div className={styles.btn_row}>
          <div>
            <button className="icon-btn">
              <MobileLikeIcon />
            </button>
            <p>{ post.likeCount }</p>
          </div>
          <div>
            <button className="icon-btn">
              <MobileDislikeIcon />
            </button>
            <p>{ post.dislikeCount }</p>
          </div>
          <div>
            <button className="icon-btn" onClick={() => setCommentBox(true)}>
              <MobileCommentIcon />
            </button>
            <p>0</p>
          </div>
        </div>)}

        <h3>Comments:</h3>
        <CommentFeed comments={comments} />

        <AddComment show={commentBox} close={() => setCommentBox(false)}/>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  const { id } = query

  const ref = doc(db, `posts/${id}`)
  const d = await getDoc(ref)
  const post = { ...d.data(), id: d.id }

  const post_prop = postToJSON(post)

  return {
    props: {
      post: post_prop
    }
  }
}

export default PostPage