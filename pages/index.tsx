import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import MobileAddButton from '../components/MobileAddButton'
import PostFeed from '../components/PostFeed'
import ScrollUpButton from '../components/scrollUpButton'
import Toolbar from '../components/Toolbar'
import { db, fromMillis, postToJSON } from '../lib/firebase'
import { useMyEffect } from '../lib/hooks'

const LIMIT = 15

const Home: NextPage = (props: any) => {

  const [q, updateQ] = useState(query(
    collection(db, 'posts'),
    where('state', '==', 'posted'),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  ))
  const [searchVal, setSearchVal] = useState('')

  const [postsEnd, setPostsEnd] = useState(false)

  // all posts in query
  const [posts, setPosts] = useState(props.posts)
  // posts displayed on screen
  const [displyPosts, setDisplayPosts] = useState(props.posts)

  const changeFilter = async () => {
    const snap = await getDocs(q)
    const newPosts = snap.docs.map(d => {
      const p = { ...d.data(), id: d.id }
      return postToJSON(p)
    })

    setPosts(newPosts)
  }

  const getMorePosts = async () => {
    const last = posts[posts.length - 1]

    const cursor = fromMillis(last.createdAt)

    const snap = await getDocs(query(q, startAfter(cursor)))
    const newPosts = snap.docs.map(d => {
      const p = { ...d.data(), id: d.id }
      return postToJSON(p)
    })

    setPosts(posts.concat(newPosts))

    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
  }

  useMyEffect(changeFilter, [q])
  useEffect(() => {
    setDisplayPosts(posts.filter((p: any) => p.title.toLocaleLowerCase().search(searchVal) > -1))
  }, [searchVal])
  useEffect(() => {
    setDisplayPosts(posts)
  }, [posts])

  return (
    <>
      <Toolbar setQuery={updateQ} setSearch={setSearchVal}></Toolbar>

      <PostFeed posts={displyPosts} />

      <div className="center">
        {!postsEnd && <Button onClick={getMorePosts} color="blue">Load More</Button>}
        {postsEnd && 'You have reached the end!'}
      </div>

      <ScrollUpButton />
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
