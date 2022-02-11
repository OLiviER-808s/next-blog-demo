import Link from "next/link"
import styles from '../styles/Header.module.css'
import useScreenWidth from "../lib/screen-width"
import { useContext } from "react";
import { SidebarUpdateContext } from "../lib/SidebarProvider";
import MenuIcon from '../public/icons/menu_closed.svg';
import { AuthContext } from "../lib/AuthProvider";

const Header = () => {
  const isHandheld =  useScreenWidth();
  const setSidebar = useContext(SidebarUpdateContext);
  const user = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>
          <Link href="/">Next.js Demo</Link>
        </h1>

        <div className="spacer"></div>

        { isHandheld ? (
          <button className="icon-btn dp36" onClick={() => setSidebar(true)}>
            <MenuIcon />
          </button>
        ) : (
          <>
            <Link href="/about">About</Link>
            {user ? 
              (<Link href={`/profile/${user.uid}`}>My Account</Link>) :
              (<Link href="/signup">Signup</Link>)
            }
          </>
        ) }
      </div>
    </header>
  )
}

export default Header