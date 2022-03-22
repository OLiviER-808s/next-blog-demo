import { motion } from 'framer-motion'
import { useContext } from 'react'
import { ThemeUsedContext } from '../lib/ThemeProvider'
import styles from '../styles/List.module.css'

export const List = ({ children, clickable }: any) => {
  const dark = useContext(ThemeUsedContext) === 'dark'

  return (
    <div className={styles.list}>
      {children.map((child: any, idx: number) => {
        return (
          <motion.div key={idx} 
          whileHover={{ filter: clickable ? dark ? 'brightness(1.5)' : 'brightness(0.9)' : 'none' }}
          className={`${clickable ? styles.clickable : null}`}>
            { child }
          </motion.div>
        )
      })}
    </div>
  )
}

export const ListItem = ({ children, onClick }: any) => {
  return (
    <div className={styles.item} onClick={() => onClick ? onClick() : null}>
      { children }
    </div>
  )
}