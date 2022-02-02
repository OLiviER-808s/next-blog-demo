import { useContext } from 'react'
import { SidebarOpenContext } from '../lib/SidebarProvider'
import styles from '../styles/Sidebar.module.css'

const Sidebar = () => {
  const isOpen = useContext(SidebarOpenContext)

  return (
    <div hidden={!isOpen} className={styles.sidebar}>
      sidebar
    </div>
  )
}

export default Sidebar