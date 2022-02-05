import styles from '../styles/Button.module.css'

const Button = (props: any) => {
  return (
    <button className={`${styles.btn} ${styles[props.color]}`} onClick={() => props.onClick()}>
      { props.children }
    </button>
  )
}

export default Button