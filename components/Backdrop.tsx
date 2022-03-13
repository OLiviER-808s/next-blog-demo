import styles from '../styles/Backdrop.module.css'

const Backdrop = ({ children, onClick }: any) => {
  return (
    <div className={styles.backdrop} onClick={onClick}>
      { children }
    </div>
  )
}

export default Backdrop