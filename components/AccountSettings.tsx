import Button from "./Button";
import MoonIcon from '../public/icons/moon18.svg'
import SunIcon from '../public/icons/sun18.svg'
import ProfileIcon from '../public/icons/profile.svg'
import LogoutIcon from '../public/icons/logout18.svg'
import DeleteIcon from '../public/icons/delete18.svg'
import HoldButton from "./HoldButton";
import DeleteBar from "./DeleteBar";
import { ThemeUpdateContext, ThemeUsedContext } from '../lib/ThemeProvider'
import { deleteAccount, useLogout } from "../lib/auth";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const AccountSettings = () => {
  const logout = useLogout()

  const theme = useContext(ThemeUsedContext)
  const toggleTheme = useContext(ThemeUpdateContext)

  const router = useRouter()
  const editProfile = () => router.push(`/profile/edit`)

  const [fill, setFill] = useState(0)

  return (
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
        <HoldButton speed={50} setFill={setFill} onEnd={deleteAccount}>
          <Button color="red">
            <DeleteIcon />
            Delete Account
          </Button>
        </HoldButton>
      </div>

      <DeleteBar progress={fill}/>
    </div>
  )
}

export default AccountSettings