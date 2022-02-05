import styles from '../styles/TextBox.module.css'

const Textbox = (props: any) => {
  return (
    <div>
      <input 
      type={props.type} 
      className={styles.text_box}
      value={props.value}
      onChange={e => props.changeValue(e)}
      placeholder={props.placeholder} />
    </div>
  )
}

export default Textbox