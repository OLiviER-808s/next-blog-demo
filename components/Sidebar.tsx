import Link from 'next/link'
import { useContext } from 'react'
import { SidebarOpenContext, SidebarUpdateContext } from '../lib/SidebarProvider'
import styles from '../styles/Sidebar.module.css'
import MenuIcon from '../public/icons/menu_open.svg'
import { useRouter } from 'next/router'
import Button from './Button'
import MoonIcon from '../public/icons/moon18.svg'
import SunIcon from '../public/icons/sun18.svg'
import { ThemeUpdateContext, ThemeUsedContext } from '../lib/ThemeProvider'
import { AuthContext } from '../lib/AuthProvider'
import { useLogout } from '../lib/auth'
import Backdrop from './Backdrop'

const Sidebar = () => {
  const isOpen = useContext(SidebarOpenContext)
  const setSidebar = useContext(SidebarUpdateContext)

  const router = useRouter()
  router.events?.on('routeChangeComplete', () => setSidebar(false))

  const theme = useContext(ThemeUsedContext)
  const toggleTheme = useContext(ThemeUpdateContext)

  const user = useContext(AuthContext)
  const logout = useLogout()

  return (
    <div hidden={!isOpen}>
      <Backdrop onClick={() => setSidebar(false)}>
        <div className={styles.sidebar}>
          <div className={styles.list}>
            <div>
              <button className="icon-btn dp36" onClick={() => setSidebar(false)}>
                <MenuIcon />
              </button>
              <h2>Menu</h2>
            </div>

            <div>
              <Link href="/">Home</Link>
            </div>
            <div>
              <Link href="/about">About</Link>
            </div>
            {!user ? (
              <>
                <div>
                  <Link href="/signup">Signup</Link>
                </div>
                <div>
                  <Link href="/signup?tab=1">Login</Link>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link href={`/profile/${user.username}`}>My Account</Link>
                </div>
                <div onClick={logout}>
                  <Link href="/">Logout</Link>
                </div>
              </>
            )}

            <div className="spacer"></div>

            <div>
              <Button color="basic" onClick={toggleTheme}>
                {theme === 'light' ? <MoonIcon/> : <SunIcon />}
                Toggle Theme
              </Button>
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  )
}

export default Sidebar