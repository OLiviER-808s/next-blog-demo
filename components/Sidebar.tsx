import Link from 'next/link'
import { useContext } from 'react'
import { SidebarOpenContext, SidebarUpdateContext } from '../lib/SidebarProvider'
import styles from '../styles/Sidebar.module.css'
import MenuIcon from '../public/icons/menu_open.svg'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const isOpen = useContext(SidebarOpenContext)
  const setSidebar = useContext(SidebarUpdateContext)

  const router = useRouter();
  router.events?.on('routeChangeComplete', () => setSidebar(false));

  return (
    <div hidden={!isOpen} className={styles.sidebar}>
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
        <Link href="/signup?tab=0">Signup</Link>
      </div>
      <div>
        <Link href="/signup?tab=1">Login</Link>
      </div>
    </div>
  )
}

export default Sidebar