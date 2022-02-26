import styles from '../styles/ProgressBar.module.css'

interface barProps {
  fillColor: string,
  fillWidth: number,
  color: string
}

const ProgressBar = (props: barProps) => {
  return (
    <div className={styles.bar} style={{'backgroundColor': props.color }}>
      <div className={styles.fill} style={{'backgroundColor': props.fillColor, 'width': `${props.fillWidth}%`}}></div>
    </div>
  )
}

export default ProgressBar