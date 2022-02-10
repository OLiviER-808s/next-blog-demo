import styles from '../styles/Textarea.module.css'

const Textarea = ({ height, placeholder, value, onChange }: any) => {
  return (
    <div className={styles.text_field}>
      <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder} 
      style={{'height': `${height}em`}} 
      className={styles.textarea}></textarea>
    </div>
  )
}

export default Textarea