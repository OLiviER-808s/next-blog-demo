import Link from "next/link"
import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Next Blog Demo</h1>

        <div className="spacer"></div>

        <Link href="about">About</Link>
        <Link href="Signup">Signup</Link>
      </div>
    </header>
  )
}

export default Header