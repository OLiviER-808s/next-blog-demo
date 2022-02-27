import { collection, doc, getDoc, query, where, orderBy, onSnapshot, writeBatch, increment } from "firebase/firestore";
import { NextPage } from "next";
import { auth, db, postToJSON } from "../../lib/firebase";
import LikeIcon from '../../public/icons/like36.svg'
import MobileLikeIcon from '../../public/icons/like24.svg'
import DislikeIcon from '../../public/icons/dislike36.svg'
import MobileDislikeIcon from '../../public/icons/dislike24.svg'
import CommentIcon from '../../public/icons/comment36.svg'
import MobileCommentIcon from '../../public/icons/comment24.svg'
import MobileEditIcon from '../../public/icons/edit24.svg'
import MobileDeleteIcon from '../../public/icons/delete24.svg'
import DeleteIcon from '../../public/icons/delete36.svg'
import EditIcon from '../../public/icons/edit36.svg'
import styles from '../../styles/postPage.module.css'
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddComment from "../../components/AddComment";
import useScreenWidth from "../../lib/screen-width";
import { useRouter } from "next/router";
import { AuthContext } from "../../lib/AuthProvider";
import CommentFeed from "../../components/CommentFeed";
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import Post from "../../models/Post.model";
import HoldButton from "../../components/HoldButton";
import { deletePost } from "../../lib/postService";
import DeleteBar from "../../components/DeleteBar";

const PostPage: NextPage = (props: any) => {
  const contentRef: any = useRef(null)
  const isHandheld = useScreenWidth() < 600
  const router = useRouter()
  const user = useContext(AuthContext)
  const uid = auth.currentUser?.uid
  let isUserPost: boolean | null

  const [postData] = useDocumentData(doc(db, `posts/${props.post.id}`))
  const post: Post = { ...postData, id: props.post.id } || props.post

  const [commentBox, setCommentBox] = useState(false)
  const [comments, setComments] = useState([])

  const likeRef = doc(db, `posts/${post.id}/likes/${uid}`)
  const [likeDoc] = useDocument(likeRef)
  const dislikeRef = doc(db, `posts/${post.id}/dislikes/${uid}`)
  const [dislikeDoc] = useDocument(dislikeRef)

  const [fill, setFill] = useState(0)

  const addLike = async () => {
    const ref = doc(db, `posts/${post.id}`)
    const batch = writeBatch(db)
    
    batch.update(ref, { likeCount: increment(1) })
    batch.set(likeRef, { uid: user.uid })
    if (dislikeDoc?.exists()) {
      batch.update(ref, { dislikeCount: increment(-1) })
      batch.delete(dislikeRef)
    }

    await batch.commit()
  }
  const removeLike = async () => {
    const ref = doc(db, `posts/${post.id}`)
    const batch = writeBatch(db)

    batch.update(ref, { likeCount: increment(-1) })
    batch.delete(likeRef)

    await batch.commit()
  }

  const addDislike = async () => {
    const ref = doc(db, `posts/${post.id}`)
    const batch = writeBatch(db)

    batch.update(ref, { dislikeCount: increment(1) })
    batch.set(dislikeRef, { uid: user.uid })
    if (likeDoc?.exists()) {
      batch.update(ref, { likeCount: increment(-1) })
      batch.delete(likeRef)
    }

    await batch.commit()
  }
  const removeDislike = async () => {
    const ref = doc(db, `posts/${post.id}`)
    const batch = writeBatch(db)

    batch.update(ref, { dislikeCount: increment(-1) })
    batch.delete(dislikeRef)

    await batch.commit()
  }

  useEffect(() => {
    // sets article content
    contentRef.current.innerHTML = props.post.content

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
      {!isHandheld && user && <div className={styles.btn_column}>
        <div className={styles.btns}>
          <button className={`icon-btn ${likeDoc?.exists() ? styles.selected : ''}`} 
          onClick={() => likeDoc?.exists() ? removeLike() : addLike()}>
            <LikeIcon />
          </button>
          <p>{ post.likeCount }</p>
          <button className={`icon-btn ${dislikeDoc?.exists() ? styles.selected : ''}`}
          onClick={() => dislikeDoc?.exists() ? removeDislike() : addDislike()}>
            <DislikeIcon />
          </button>
          <p>{ post.dislikeCount }</p>
          <button className="icon-btn" 
          onClick={() => setCommentBox(true)}>
            <CommentIcon />
          </button>
          <p>{ comments.length }</p>
          {user && <>
            <button className="icon-btn edit-btn">
              <EditIcon />
            </button>
            <HoldButton speed={20} setFill={setFill} onEnd={() => deletePost(props.post.id)}>
              <button className="icon-btn delete-btn">
                <DeleteIcon />
              </button>
            </HoldButton>
          </>}
        </div>
      </div>}

      <div className={styles.article}>
        <div className={styles.header}>
          <h1>{ post.title }</h1>
          <p>by <Link href={`/profile/${post.authorname}`}><a>{ post.authorname }</a></Link></p>
        </div>

        <div ref={contentRef} className={styles.content}></div>

        {isHandheld && user && (<div className={styles.btn_row}>
          <div>
            <button className={`icon-btn ${likeDoc?.exists() ? styles.selected : ''}`} 
            onClick={() => likeDoc?.exists() ? removeLike() : addLike()}>
              <MobileLikeIcon />
            </button>
            <p>{ post.likeCount }</p>
          </div>
          <div>
            <button className={`icon-btn ${dislikeDoc?.exists() ? styles.selected : ''}`}
            onClick={() => dislikeDoc?.exists() ? removeDislike() : addDislike()}>
              <MobileDislikeIcon />
            </button>
            <p>{ post.dislikeCount }</p>
          </div>
          <div>
            <button className="icon-btn" onClick={() => setCommentBox(true)}>
              <MobileCommentIcon />
            </button>
            <p>{ comments.length }</p>
          </div>
          {user && (
            <>
              <div>
                <button className="icon-btn edit-btn">
                  <MobileEditIcon />
                </button>
              </div>
              <div>
                <HoldButton speed={20} setFill={setFill} onEnd={() => deletePost(props.post.id)}>
                  <button className="icon-btn delete-btn">
                    <MobileDeleteIcon />
                  </button>
                </HoldButton>
              </div>
            </>
          )}
        </div>)}

        <h3>Comments:</h3>
        <CommentFeed comments={comments} />

        <AddComment show={commentBox} close={() => setCommentBox(false)}/>
        <DeleteBar progress={fill} />
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