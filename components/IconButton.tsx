import { motion } from 'framer-motion'
import { useContext } from 'react'
import { ThemeUsedContext } from '../lib/ThemeProvider'
import styles from '../styles/IconButton.module.css'

const IconButton = (props: any) => {
  const dark = useContext(ThemeUsedContext) === 'dark'
  
  const classNames = `${styles.btn} 
  ${props.edit ? styles.edit : null} 
  ${props.selected ? styles.selected : null} 
  ${props.delete ? styles.delete : null}`

  return (
    <motion.button className={classNames} 
    onClick={() => props.onClick ? props.onClick() : null}
    whileHover={{ filter: dark ? 'brightness(1.3)' : 'brightness(0.9)' }}>
      { props.children }
    </motion.button>
  )
}

export default IconButton