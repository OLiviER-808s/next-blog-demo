import { motion } from 'framer-motion'
import { useContext } from 'react'
import { ThemeUsedContext } from '../lib/ThemeProvider'
import styles from '../styles/List.module.css'

export const List = ({ children, clickable, center }: any) => {
  const dark = useContext(ThemeUsedContext) === 'dark'

  return (
    <div className={`${styles.list} ${center ? styles.center : null}`}>
      {children.map((child: any, idx: number) => {
        return (
          <motion.div key={idx} 
          whileHover={{ backgroundColor: clickable ? dark ? '#f5f5f5' : '#1f1e1e' : 'inherit' }}
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