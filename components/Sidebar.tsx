import Link from 'next/link'
import { useContext } from 'react'
import { SidebarOpenContext, SidebarUpdateContext } from '../lib/SidebarProvider'
import styles from '../styles/Sidebar.module.css'
import MenuIcon from '../public/icons/menu_open.svg'
import { useRouter } from 'next/router'
import Button from './Button'
import MoonIcon from '../public/icons/moon.svg'
import SunIcon from '../public/icons/sun.svg'
import { ThemeUpdateContext, ThemeUsedContext } from '../lib/ThemeProvider'

const Sidebar = () => {
  const isOpen = useContext(SidebarOpenContext)
  const setSidebar = useContext(SidebarUpdateContext)

  const router = useRouter();
  router.events?.on('routeChangeComplete', () => setSidebar(false));

  const theme = useContext(ThemeUsedContext)
  const toggleTheme = useContext(ThemeUpdateContext)

  return (
    <div className={styles.sidebar} hidden={!isOpen}>
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
        <div>
          <Link href="/signup">Signup</Link>
        </div>
        <div>
          <Link href="/signup?tab=1">Login</Link>
        </div>

        <div className="spacer"></div>

        <div>
          <Button color="basic" onClick={toggleTheme}>
            {theme === 'light' ? <MoonIcon/> : <SunIcon />}
            Toggle Theme
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar