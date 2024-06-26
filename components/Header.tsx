import Link from "next/link"
import styles from '../styles/Header.module.css'
import { useScreenWidth } from "../lib/hooks"
import { useContext } from "react";
import { SidebarUpdateContext } from "../lib/SidebarProvider";
import MenuIcon from '../public/icons/menu_closed.svg';
import { AuthContext } from "../lib/AuthProvider";
import IconButton from "./IconButton";

const Header = () => {
  const isHandheld = useScreenWidth() < 600;
  const setSidebar = useContext(SidebarUpdateContext);
  const user = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>
          <Link href="/">Blog Demo</Link>
        </h1>

        <div className="spacer"></div>

        { isHandheld ? (
          <IconButton onClick={() => setSidebar(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <Link href="/about">About</Link>
            {user ? 
              (<Link href={`/profile/${user.username}`}>My Account</Link>) :
              (<Link href="/signup">Signup</Link>)
            }
          </>
        ) }
      </div>
    </header>
  )
}

export default Header