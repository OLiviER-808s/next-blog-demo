import Link from "next/link"
import styles from '../styles/Header.module.css'
import useScreenWidth from "../lib/screen-width"
import Image from "next/image";
import { useContext } from "react";
import { SidebarUpdateContext } from "../lib/SidebarProvider";

const Header = () => {
  const isHandheld =  useScreenWidth();
  const toggleSidebar = useContext(SidebarUpdateContext)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Next.js Demo</h1>

        <div className="spacer"></div>

        { isHandheld ? (
          <button className="icon-btn" onClick={toggleSidebar}>
            <Image src="/icons/menu.svg" width={30} height={30}/>
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