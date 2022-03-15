import styles from '../styles/Dropdown.module.css'

const Dropdown = ({ children, show }: any) => {

  return show ? 
    <div className={styles.dropdown}>
      { children }
    </div>
  : <></>
}

export default Dropdown