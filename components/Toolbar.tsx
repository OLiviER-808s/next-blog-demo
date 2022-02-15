import styles from '../styles/Toolbar.module.css'
import SearchIcon from '../public/icons/search.svg'
import SortIcon from '../public/icons/sort.svg'
import UpIcon from '../public/icons/up.svg'
import DownIcon from '../public/icons/down.svg'
import SunIcon from '../public/icons/sun24.svg'
import MoonIcon from '../public/icons/moon24.svg'
import LogoutIcon from '../public/icons/logout.svg'
import LoginIcon from '../public/icons/login.svg'
import { useContext } from 'react'
import { ThemeUpdateContext, ThemeUsedContext } from '../lib/ThemeProvider'
import { AuthContext } from '../lib/AuthProvider'
import useScreenWidth from '../lib/screen-width'
import Button from './Button'
import AddIcon from '../public/icons/add.svg'
import { useLogout } from '../lib/auth'
import { useRouter } from 'next/router'

const Toolbar = () => {
  const theme = useContext(ThemeUsedContext)
  const user = useContext(AuthContext)
  const isHandheld = useScreenWidth()
  const router = useRouter()

  const switchThme = useContext(ThemeUpdateContext)
  const logout = useLogout()
  const login = () => router.push('/signup?tab=1')

  return (
    <div className={styles.bar}>
      <button className="icon-btn">
        <SearchIcon />
      </button>
      <button className="icon-btn">
        <SortIcon />
      </button>

      <div className="spacer"></div>

      {user && !isHandheld && (<>
        <Button color="green">
          <AddIcon />
          Create Post
        </Button>
        <div className="spacer"></div>
      </>)}

      <button className="icon-btn">
        <DownIcon />
      </button>
      <button className="icon-btn">
        <UpIcon />
      </button>

      {!isHandheld && (<>
        <button className='icon-btn' onClick={switchThme}>
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        {user ? (
          <button className="icon-btn" onClick={logout}>
            <LogoutIcon />
          </button>
        ) : (
          <button className="icon-btn" onClick={login}>
            <LoginIcon />
          </button>
        )}
      </>)}
    </div>
  )
}

export default Toolbar