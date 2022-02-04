import Link from "next/link"
import styles from '../styles/Header.module.css'
import useScreenWidth from "../lib/screen-width"
import { useContext } from "react";
import { SidebarUpdateContext } from "../lib/SidebarProvider";
import MenuIcon from '../public/icons/menu_closed.svg';

const Header = () => {
  const isHandheld =  useScreenWidth();
  const toggleSidebar = useContext(SidebarUpdateContext)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Next.js Demo</h1>

        <div className="spacer"></div>

        { isHandheld ? (
          <button className="icon-btn dp36" onClick={toggleSidebar}>
            <MenuIcon />
          </button>
        ) : (
          <>
            <Link href="about">About</Link>
            <Link href="Signup">Signup</Link>
          </>
        ) }
      </div>
    </header>
  )
}

export default Header