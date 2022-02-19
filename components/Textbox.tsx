import styles from '../styles/TextBox.module.css'
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
  validator?: Function,
  placeholder?: string,
  returnValidatorResult?: boolean
}

const Textbox = (props: TextboxProps) => {
  const valid = props.validator ? props.validator() : null

  const updateValue = (e: any) => {
    if (props.onChange) {
      props.onChange(props.returnValidatorResult ? {value: e.target.value, valid: valid === 'valid'} : e.target.value)
    }
  }

  return (
    <div className={styles.text_field}>
      <div className={styles.inner}>
        <input 
        type={props.type} 
        className={`${styles.text_box} 
        ${valid === 'valid' ? styles.validated : ''} 
        ${valid === 'error' ? styles.err : ''}  
        ${props.fullWidth ? styles.fullWidth : ''} 
        ${props.big ? styles.big : ''}`}
        value={props.value}
        onChange={updateValue}
        placeholder={props.placeholder} />

        {props.icon && (
          valid === 'error' ? <CrossIcon className={`${styles.icon} ${styles.err}`} /> :
          <TickIcon className={`${styles.icon} ${valid === 'valid' ? styles.validated : ''}`} />
        )}
      </div>

      <p className='error'>{props.error_msg && valid === 'error' ? props.error_msg : ''}</p>
    </div>
  )
}

export default Textbox