import styles from '../styles/TextBox.module.css'
import TickIcon from '../public/icons/tick.svg'
import CrossIcon from '../public/icons/cross.svg'

const Textbox = (props: any) => {
  return (
    <div className={styles.text_field}>
      <input 
      type={props.type} 
      className={`${styles.text_box} 
      ${props.icon && !props.error && props.validator() ? styles.validated : ''} 
      ${props.error && props.icon ? styles.err : ''}`}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      placeholder={props.placeholder} />

      {props.icon && (
        props.error ? <CrossIcon className={`${styles.icon} ${styles.err}`} /> :
        <TickIcon className={`${styles.icon} ${props.validator() ? styles.validated : ''}`} />
      )}
    </div>
  )
}

export default Textbox