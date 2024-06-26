import styles from '../styles/Textbox.module.css'
import TickIcon from '../public/icons/tick.svg'
import CrossIcon from '../public/icons/cross.svg'

interface TextboxProps {
  type?: string,
  icon?: boolean,
  error_msg?: string,
  fullWidth?: boolean,
  big?: boolean,
  onChange?: Function,
  value?: string,
  placeholder?: string,
  validationState?: string,
  autoFocus?: boolean
}

const Textbox = (props: TextboxProps) => {
  const state = props.validationState

  return (
    <div className={styles.text_field}>
      <div className={styles.inner}>
        <input 
        type={props.type} 
        className={`${styles.text_box} 
        ${state === 'valid' ? styles.validated : ''} 
        ${state === 'error' ? styles.err : ''}  
        ${props.fullWidth ? styles.fullWidth : ''} 
        ${props.big ? styles.big : ''}`}
        value={props.value}
        onChange={(e) => props.onChange ? props.onChange(e.target.value) : null}
        autoFocus={props.autoFocus}
        placeholder={props.placeholder} />

        {props.icon && (
          state === 'error' ? <CrossIcon className={`${styles.icon} ${styles.err}`} /> :
          <TickIcon className={`${styles.icon} ${state === 'valid' ? styles.validated : ''}`} />
        )}
      </div>

      <p className='error'>{props.error_msg && state === 'error' ? props.error_msg : ''}</p>
    </div>
  )
}

export default Textbox