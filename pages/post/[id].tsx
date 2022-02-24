import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { db, postToJSON } from "../../lib/firebase";
import LikeIcon from '../../public/icons/like36.svg'
import DislikeIcon from '../../public/icons/dislike36.svg'
import CommentIcon from '../../public/icons/comment.svg'
import styles from '../../styles/postPage.module.css'
import { useEffect, useRef } from "react";
import Link from "next/link";

const PostPage: NextPage = ({ post }: any) => {
  const contentRef: any = useRef(null)

  useEffect(() => {
    contentRef.current.innerHTML = post.content
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.btn_column}>
        <button className="icon-btn">
          <LikeIcon />
        </button>
        <button className="icon-btn">
          <DislikeIcon />
        </button>
        <button className="icon-btn">
          <CommentIcon />
        </button>
      </div>
      <div className={styles.article}>
        <div className={styles.header}>
          <h1>{ post.title }</h1>
          <p>by <Link href={`/profile/${post.authorname}`}>{ post.authorname }</Link></p>
        </div>

        <div ref={contentRef} className={styles.content}></div>
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