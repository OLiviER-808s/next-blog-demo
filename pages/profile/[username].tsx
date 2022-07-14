import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AccountSettings from "../../components/AccountSettings";
import Avatar from "../../components/Avatar";
import PostFeed from "../../components/PostFeed";
import { Tab, TabGroup } from "../../components/Tabs";
import { getUserDrafts, getUserPosts, getUserWithUsername } from "../../lib/auth";
import { AuthContext } from "../../lib/AuthProvider";
import { postToJSON } from "../../lib/firebase";


const ProfilePage: NextPage = ({ author, posts }: any) => {
  const user = useContext(AuthContext)
  const isUserPage = author.username === user?.username || false

  const [drafts, setDrafts]: any = useState([])

  useEffect(() => {
    if (user) {
      getDrafts()
    }
  }, [user])

  const getDrafts = async () => {
    const d = await getUserDrafts(user.uid)
    setDrafts(d)
  }

  return (
    <>
      <div className="center">
        <div style={{'textAlign': 'center'}}>
          <Avatar src={author.photo} width={5.5} />
          <h2>{author.username}</h2>
          <p>{author.bio}</p>
        </div>
      </div>

      <div className="center">
        {isUserPage && (
          <TabGroup name="tabs">
            <Tab id="posts" label="My Posts">
              <PostFeed posts={posts}></PostFeed>
            </Tab>
            <Tab id="drafts" label="My Drafts">
              <PostFeed posts={drafts}></PostFeed>
            </Tab>
            <Tab id="settings" label="Settings">
              <AccountSettings username={author.username} />
            </Tab>
          </TabGroup>
        )}
        {!isUserPage && <PostFeed posts={posts} />}
      </div>
    </>
  )
}

export async function getServerSideProps({ query }: any) {
  const { username } = query

  const user = await getUserWithUsername(username)
  const posts: any = await getUserPosts(username)

  const posts_prop = posts.map((post: any) => postToJSON(post))

  return {
    props: {
      author: user,
      posts: posts_prop
    }
  }
}

export default ProfilePage