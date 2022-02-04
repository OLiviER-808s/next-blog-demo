import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { SidebarOpenContext, SidebarUpdateContext } from '../lib/SidebarProvider'
import styles from '../styles/Sidebar.module.css'
import MenuIcon from '../public/icons/menu_open.svg'

const Sidebar = () => {
  const isOpen = useContext(SidebarOpenContext)
  const close = useContext(SidebarUpdateContext)

  return (
    <div hidden={!isOpen} className={styles.sidebar}>
      <div>
        <button className="icon-btn dp36" onClick={close}>
          <MenuIcon />
        </button>
        <h2>Menu</h2>
      </div>

      <div>
        <Link href="/about">About</Link>
      </div>
      <div>
        <Link href="/login">Login</Link>
      </div>
      <div>
        <Link href="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Sidebar