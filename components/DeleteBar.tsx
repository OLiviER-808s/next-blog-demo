import Card from "./Card";
import ProgressBar from "./ProgressBar";
import styles from '../styles/DeleteBar.module.css'

const DeleteBar = ({ progress }: any) => {
  return (
    <div className="center">
      {progress > 0 && (
      <div className={styles.toast}>
        <Card>
          <ProgressBar fillWidth={progress} color="var(--secondary-bg-color)" fillColor="rgb(235, 23, 23)" />
        </Card>
      </div>)}
    </div>
  )
}

export default DeleteBar