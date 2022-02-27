import Image from 'next/image'
import styles from '../styles/Avatar.module.css'

const Avatar = ({ src, width }: any) => {
  return (
    <div style={{'width': `${width}em`}} className={styles.avatar}>
      <Image src={src} alt="avatar" />
    </div>
  )
}

export default Avatar