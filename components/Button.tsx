import styles from '../styles/Button.module.css'

const Button = (props: any) => {
  return (
    <button className={`${styles.btn} ${styles[props.color]} ${props.secondary ? styles.secondary : ''}`} 
    onClick={() => props.onClick()}>
      { props.children }
    </button>
  )
}

export default Button