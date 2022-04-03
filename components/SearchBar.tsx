import styles from '../styles/SearchBar.module.css'
import SearchIcon from '../public/icons/search.svg'
import { useState } from 'react'
import IconButton from './IconButton'

const SearchBar = ({ value, onChange }: any) => {
  const [bar, toggleBar] = useState(false)

  return (
    <>
      {!bar && 
      <IconButton onClick={() => toggleBar(!bar)}>
        <SearchIcon />
      </IconButton>}

      {bar && 
      <form onSubmit={() => toggleBar(!bar)}>
        <input 
        autoFocus 
        type="text" 
        className={styles.bar} 
        placeholder="Search Posts..." 
        value={value}
        onChange={(e) => onChange(e.target.value)} />
      </form>
      }
    </>
  )
}

export default SearchBar