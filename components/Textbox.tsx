import styles from '../styles/TextBox.module.css'
import TickIcon from '../public/icons/tick.svg'

const Textbox = (props: any) => {
  return (
    <div className={styles.text_field}>
      <input 
      type={props.type} 
      className={`${styles.text_box} ${props.icon && props.validator() ? styles.validated : ''}`}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      placeholder={props.placeholder} />

      {props.icon && (
        <TickIcon className={`${styles.icon} ${props.validator() ? styles.validated : ''}`} />
      )}
    </div>
  )
}

export default Textbox