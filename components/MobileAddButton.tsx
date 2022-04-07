import styles from '../styles/MobileAddButton.module.css'
import AddIcon from '../public/icons/add.svg'
import { useRouter } from 'next/router'

const MobileAddButton = () => {
  const router = useRouter()
  const add = () => router.push('/post/create')

  return (<>
    <button className={styles.btn} onClick={add}>
      <AddIcon />
    </button>
  </>)
}

export default MobileAddButton