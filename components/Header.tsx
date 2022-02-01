import Link from "next/link"
import styles from '../styles/Header.module.css'
import useScreenWidth from "../lib/screen-width"
import Image from "next/image";

const Header = () => {
  const isHandheld =  useScreenWidth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Next.js Demo</h1>

        <div className="spacer"></div>

        { isHandheld ? (
          <p>dropdown</p>
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