import styles from '../styles/Loader.module.css'

const Loader = ({ show }: any) => {

  return show ? <div className={styles.loader}></div> : null
}

export default Loader