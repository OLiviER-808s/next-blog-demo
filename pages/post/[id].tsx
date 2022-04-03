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
import styles from '../../styles/PostPage.module.css'
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddComment from "../../components/AddComment";
import { useScreenWidth } from "../../lib/hooks";
import { useRouter } from "next/router";
import { AuthContext } from "../../lib/AuthProvider";
import CommentFeed from "../../components/CommentFeed";
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import Post from "../../models/Post.model";
import HoldButton from "../../components/HoldButton";
import { usePostDelete } from "../../lib/postService";
import DeleteBar from "../../components/DeleteBar";
import { deleteClick } from "../../lib/toast";
import IconButton from "../../components/IconButton";

const PostPage: NextPage = (props: any) => {
  const contentRef: any = useRef(null)
  const isHandheld = useScreenWidth() < 600
  const router = useRouter()
  const user = useContext(AuthContext)
  const uid = auth.currentUser?.uid
  const [isUserPost, setIsUserPost] = useState(false);

  const [postData] = useDocumentData(doc(db, `posts/${props.post.id}`))
  const post: Post = { ...postData, id: props.post.id } || props.post

  const [commentBox, setCommentBox] = useState(false)
  const [comments, setComments] = useState([])

  const likeRef = doc(db, `posts/${post.id}/likes/${uid}`)
  const [likeDoc] = useDocument(likeRef)
  const dislikeRef = doc(db, `posts/${post.id}/dislikes/${uid}`)
  const [dislikeDoc] = useDocument(dislikeRef)

  const [fill, setFill] = useState(0)
  const deletePost = usePostDelete(props.post.id)

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
    setIsUserPost(post.authorname === user?.username)

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
          <IconButton selected={likeDoc?.exists()}
          onClick={() => likeDoc?.exists() ? removeLike() : addLike()}>
            <LikeIcon />
          </IconButton>
          <p>{ post.likeCount }</p>
          <IconButton selected={dislikeDoc?.exists()}
          onClick={() => dislikeDoc?.exists() ? removeDislike() : addDislike()}>
            <DislikeIcon />
          </IconButton>
          <p>{ post.dislikeCount }</p>
          <IconButton 
          onClick={() => setCommentBox(!commentBox)}>
            <CommentIcon />
          </IconButton>
          <p>{ comments.length }</p>
          {isUserPost && <>
            <IconButton edit>
              <EditIcon />
            </IconButton>
            <HoldButton speed={20} setFill={setFill} onEnd={deletePost} onStart={deleteClick}>
              <IconButton delete>
                <DeleteIcon />
              </IconButton>
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
            <IconButton selected={likeDoc?.exists()} 
            onClick={() => likeDoc?.exists() ? removeLike() : addLike()}>
              <MobileLikeIcon />
            </IconButton>
            <p>{ post.likeCount }</p>
          </div>
          <div>
            <IconButton selected={dislikeDoc?.exists()}
            onClick={() => dislikeDoc?.exists() ? removeDislike() : addDislike()}>
              <MobileDislikeIcon />
            </IconButton>
            <p>{ post.dislikeCount }</p>
          </div>
          <div>
            <IconButton onClick={() => setCommentBox(!commentBox)}>
              <MobileCommentIcon />
            </IconButton>
            <p>{ comments.length }</p>
          </div>
          {isUserPost && (
            <>
              <div>
                <IconButton edit>
                  <MobileEditIcon />
                </IconButton>
              </div>
              <div>
                <HoldButton speed={20} setFill={setFill} onEnd={deletePost} onStart={deleteClick}>
                  <IconButton delete>
                    <MobileDeleteIcon />
                  </IconButton>
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