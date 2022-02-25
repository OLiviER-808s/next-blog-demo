import { NextPage } from "next";
import { useContext } from "react";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import PostFeed from "../../components/PostFeed";
import { Tab, TabGroup } from "../../components/Tabs";
import { getUserPosts, getUserWithUsername, useLogout } from "../../lib/auth";
import { AuthContext } from "../../lib/AuthProvider";
import { postToJSON } from "../../lib/firebase";
import { ThemeUpdateContext, ThemeUsedContext } from '../../lib/ThemeProvider'
import MoonIcon from '../../public/icons/moon18.svg'
import SunIcon from '../../public/icons/sun18.svg'
import ProfileIcon from '../../public/icons/profile.svg'
import LogoutIcon from '../../public/icons/logout18.svg'
import DeleteIcon from '../../public/icons/delete18.svg'
import { useRouter } from "next/router";


const ProfilePage: NextPage = ({ author, posts }: any) => {
  const user = useContext(AuthContext)
  const isUserPage = author.username === user?.username || false
  const logout = useLogout()

  const theme = useContext(ThemeUsedContext)
  const toggleTheme = useContext(ThemeUpdateContext)

  const router = useRouter()
  const editProfile = () => router.push(`/profile/edit`)

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
              <PostFeed posts={posts.filter((p: any) => p.state === 'posted')}></PostFeed>
            </Tab>
            <Tab id="drafts" label="My Drafts">
              <PostFeed posts={posts.filter((p: any) => p.state === 'draft')}></PostFeed>
            </Tab>
            <Tab id="settings" label="Settings">
              <div className="center">
                <div className="btn-column">
                  <Button color="grey" onClick={logout}>
                    <LogoutIcon />
                    Logout
                  </Button>
                  <Button color="grey" onClick={toggleTheme}>
                    {theme === 'light' ? <MoonIcon/> : <SunIcon />}
                    Switch Theme
                  </Button>
                  <Button color="green" onClick={editProfile}>
                    <ProfileIcon />
                    Edit Profile
                  </Button>
                  <Button color="red">
                    <DeleteIcon />
                    Delete Account
                  </Button>
                </div>
              </div>
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