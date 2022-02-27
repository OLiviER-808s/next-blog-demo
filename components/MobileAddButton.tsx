import styles from '../styles/MobileAddButton.module.css'
import AddIcon from '../public/icons/add.svg'
import useScreenWidth from '../lib/screen-width'
import { useRouter } from 'next/router'

const MobileAddButton = () => {
  const isHandheld = useScreenWidth() < 600
  const router = useRouter()
  const add = () => router.push('/post/create')

  return (<>
    {isHandheld ? (
      <button className={styles.btn} onClick={add}>
        <AddIcon />
      </button>
    ) : ''}
  </>)
}

export default MobileAddButton