import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useState } from 'react'
import Button from '../components/Button'
import PostFeed from '../components/PostFeed'
import Toolbar from '../components/Toolbar'
import { db, fromMillis, postToJSON } from '../lib/firebase'

const LIMIT = 15

const Home: NextPage = (props: any) => {
  const [postsEnd, setPostsEnd] = useState(false)
  const [posts, setPosts] = useState(props.posts)

  const getMorePosts = async () => {
    const last = posts[posts.length - 1]

    const cursor = fromMillis(last.createdAt)

    const q = query(
      collection(db, 'posts'),
      where('state', '==', 'posted'),
      orderBy('createdAt', 'desc'),
      limit(LIMIT),
      startAfter(cursor)
    )

    const snap = await getDocs(q)
    const newPosts = snap.docs.map(d => {
      const p = { ...d.data(), id: d.id }
      return postToJSON(p)
    })

    setPosts(posts.concat(newPosts));

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  }

  return (
    <>
      <Toolbar></Toolbar>
      <PostFeed posts={posts} />
      <div className="center">
        {!postsEnd && <Button onClick={getMorePosts} color="blue">Load More</Button>}
        {postsEnd && 'You have reached the end!'}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const ref = collection(db, 'posts')
  const q = query(ref, where('state', '==', 'posted'), orderBy('createdAt', 'desc'), limit(LIMIT))
  const snap = await getDocs(q)
  const posts = snap.docs.map(d => {
    const p = { ...d.data(), id: d.id }
    return postToJSON(p)
  })

  return {
    props: {
      posts: posts
    }
  }
}
 
export default Home
