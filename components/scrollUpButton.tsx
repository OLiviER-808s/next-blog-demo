import styles from '../styles/ScrollUpButton.module.css'
import UpIcon from '../public/icons/up.svg'
import { useEffect, useState } from 'react'

const ScrollUpButton = () => {
  const [position, setPostition] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setPostition(window.scrollY)
    })
  }, [])

  const scrollUp = () => window.scrollTo(0, 0)

  return position > 0 ? (
    <button onClick={scrollUp} className={styles.btn}>
      <UpIcon></UpIcon>
    </button>
  ) : null
}

export default ScrollUpButton