import { NextPage } from "next";
import Avatar from "../../components/Avatar";
import PostFeed from "../../components/PostFeed";
import { getUserPosts, getUserWithUsername } from "../../lib/auth";
import { postToJSON } from "../../lib/firebase";

const ProfilePage: NextPage = ({ user, posts }: any) => {
  return (
    <>
      <div className="center">
        <div style={{'textAlign': 'center'}}>
          <Avatar src={user.photo} width={5.5} />
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
        </div>
      </div>

      <div className="center">
        <PostFeed posts={posts} />
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
      user: user,
      posts: posts_prop
    }
  }
}

export default ProfilePage