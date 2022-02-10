import styles from '../styles/Avatar.module.css'

const Avatar = ({ src, width }: any) => {
  return (
    <img style={{'width': `${width}em`}} className={styles.avatar} src={src} alt="avatar" />
  )
}

export default Avatar