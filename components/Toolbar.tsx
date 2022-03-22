import styles from '../styles/Toolbar.module.css'
import SearchIcon from '../public/icons/search.svg'
import SortIcon from '../public/icons/sort.svg'
import UpIcon from '../public/icons/up.svg'
import DownIcon from '../public/icons/down.svg'
import SunIcon from '../public/icons/sun24.svg'
import MoonIcon from '../public/icons/moon24.svg'
import LogoutIcon from '../public/icons/logout24.svg'
import LoginIcon from '../public/icons/login24.svg'
import { useContext, useState } from 'react'
import { ThemeUpdateContext, ThemeUsedContext } from '../lib/ThemeProvider'
import { AuthContext } from '../lib/AuthProvider'
import useScreenWidth from '../lib/screen-width'
import Button from './Button'
import AddIcon from '../public/icons/add.svg'
import { useLogout } from '../lib/auth'
import { useRouter } from 'next/router'
import Dropdown from './Dropdown'
import IconButton from './IconButton'

const Toolbar = () => {
  const theme = useContext(ThemeUsedContext)
  const user = useContext(AuthContext)
  const isHandheld = useScreenWidth() < 600
  const router = useRouter()

  const switchThme = useContext(ThemeUpdateContext)
  const logout = useLogout()
  const login = () => router.push('/signup?tab=1')
  const createPost = () => router.push('/post/create')

  const [dropdown, setDropdown] = useState(false)

  return (
    <div className={styles.bar}>
      <IconButton>
        <SearchIcon />
      </IconButton>

      <button className="icon-btn" onClick={() => setDropdown(!dropdown)}>
        <SortIcon />
        <Dropdown show={dropdown}>
          dropdown
        </Dropdown>
      </button>

      <div className="spacer"></div>

      {user && !isHandheld && (<>
        <Button color="green" onClick={createPost}>
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