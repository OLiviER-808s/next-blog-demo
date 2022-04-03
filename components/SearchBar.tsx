import styles from '../styles/SearchBar.module.css'
import SearchIcon from '../public/icons/search.svg'
import { useState } from 'react'
import IconButton from './IconButton'

const SearchBar = () => {
  const [bar, toggleBar] = useState(false)

  return (
    <>
      {!bar && 
      <IconButton onClick={() => toggleBar(!bar)}>
        <SearchIcon />
      </IconButton>}

      {bar && 
      <form onSubmit={() => toggleBar(!bar)}>
        <input autoFocus type="text" className={styles.bar} placeholder="Search Posts..." />
      </form>
      }
    </>
  )
}

export default SearchBar