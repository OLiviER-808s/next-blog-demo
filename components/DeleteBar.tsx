import Card from "./Card";
import ProgressBar from "./ProgressBar";
import styles from '../styles/DeleteBar.module.css'

const DeleteBar = ({ progress }: any) => {
  return (
    <>
      {progress > 0 && <div className={styles.toast}>
        <Card>
          Hold to Delete
          <ProgressBar fillWidth={progress} color="var(--secondary-bg-color)" fillColor="rgb(235, 23, 23)" />
        </Card>
      </div>}
    </>
  )
}

export default DeleteBar