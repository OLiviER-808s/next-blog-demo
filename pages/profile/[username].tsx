import { NextPage } from "next";
import Avatar from "../../components/Avatar";
import { getUserWithUsername } from "../../lib/auth";

const ProfilePage: NextPage = ({ user, posts }: any) => {
  return (
    <div className="center">
      <div style={{'textAlign': 'center'}}>
        <Avatar src={user.photo} width={5.5} />
        <h2>{user.username}</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  const { username } = query
  const user = await getUserWithUsername(username)

  return {
    props: {
      user: user,
      posts: []
    }
  }
}

export default ProfilePage