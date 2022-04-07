import styles from '../styles/ScrollUpButton.module.css'
import UpIcon from '../public/icons/up.svg'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const slideUp = {
  hidden: {
    y: '100vh',
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
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
}

const ScrollUpButton = () => {
  const [position, setPostition] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setPostition(window.scrollY)
    })
  }, [])

  const scrollUp = () => window.scrollTo(0, 0)

  return <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
    {position > 0 ? (
      <motion.button onClick={scrollUp} className={styles.btn}
      variants={slideUp} initial="hidden" animate="visible" exit="exit">
        <UpIcon></UpIcon>
      </motion.button>
    ) : null}
  </AnimatePresence>
}

export default ScrollUpButton