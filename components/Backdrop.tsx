import { motion } from 'framer-motion'
import styles from '../styles/Backdrop.module.css'

const Backdrop = ({ children, onClick }: any) => {
  return (
    <motion.div className={styles.backdrop} onClick={onClick}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      { children }
    </motion.div>
  )
}

export default Backdrop