import { AnimatePresence, motion } from 'framer-motion'
import styles from '../styles/Dropdown.module.css'

const drop = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.25
    }
  },
  exit: {
    y: '-100vh',
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
}

const Dropdown = ({ children, show, setShow, closeOnClick }: any) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
      {show && (
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          <motion.div className={styles.dropdown} onClick={() => closeOnClick ? setShow(false) : null} 
          variants={drop} initial="hidden" animate="visible" exit="exit">
            { children }
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Dropdown