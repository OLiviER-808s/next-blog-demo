import styles from '../styles/Toolbar.module.css'
import SearchIcon from '../public/icons/search.svg'
import SortIcon from '../public/icons/sort.svg'
import UpIcon from '../public/icons/up.svg'
import DownIcon from '../public/icons/down.svg'
import SunIcon from '../public/icons/sun24.svg'
import MoonIcon from '../public/icons/moon24.svg'
import LogoutIcon from '../public/icons/logout24.svg'
import LoginIcon from '../public/icons/login24.svg'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ThemeUpdateContext, ThemeUsedContext } from '../lib/ThemeProvider'
import { AuthContext } from '../lib/AuthProvider'
import { useScreenWidth } from '../lib/hooks'
import Button from './Button'
import AddIcon from '../public/icons/add.svg'
import { useLogout } from '../lib/auth'
import { useRouter } from 'next/router'
import Dropdown from './Dropdown'
import IconButton from './IconButton'
import { List, ListItem } from './List'
import { collection, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import SearchBar from './SearchBar'
import debounce from 'lodash.debounce'

const Toolbar = ({ setQuery, setSearch }: any) => {
  const theme = useContext(ThemeUsedContext)
  const user = useContext(AuthContext)
  const isHandheld = useScreenWidth() < 600
  const router = useRouter()

  const switchThme = useContext(ThemeUpdateContext)
  const logout = useLogout()
  const login = () => router.push('/signup?tab=1')
  const createPost = () => router.push('/post/create')

  const [dropdown, setDropdown] = useState(false)
  const [filter, setFilter] = useState('newest')

  const [searchText, setText] = useState('')

  const applyFilter = (attribute: string) => {
    if (filter === attribute) return;
    setFilter(attribute)

    const ref = collection(db, 'posts')
    let q: any;

    switch (attribute) {
      case 'newest':
        q = query(ref, orderBy('createdAt', 'desc'))
        break
      case 'oldest':
        q = query(ref, orderBy('createdAt', 'asc'))
        break
      case 'likes':
        q = query(ref, orderBy('likeCount', 'desc'))
        break
      case 'dislikes':
        q = query(ref, orderBy('dislikeCount', 'desc'))
        break
    }

    setQuery(query(q, where('state', '==', 'posted'), limit(15)))
  }

  const searchChange = useCallback(
    debounce(async (value) => {
      setSearch(value)
    }, 500),
    []
  )

  useEffect(() => {
    searchChange(searchText)
  }, [searchText])

  return (
    <div className={styles.bar}>
      <SearchBar value={searchText} onChange={setText} />

      <IconButton onClick={() => setDropdown(!dropdown)}>
        <SortIcon />
        <Dropdown show={dropdown} setShow={setDropdown} closeOnClick>
          <h3 style={{margin: '0.5em'}}>Sort By: </h3>
          <List clickable>
            <ListItem onClick={() => applyFilter('newest')}>Newest</ListItem>
            <ListItem onClick={() => applyFilter('oldest')}>Oldest</ListItem>
            <ListItem onClick={() => applyFilter('likes')}>Most Liked</ListItem>
            <ListItem onClick={() => applyFilter('dislikes')}>Most Disliked</ListItem>
          </List>
        </Dropdown>
      </IconButton>

      <div className="spacer"></div>

      {user && !isHandheld && (<>
        <Button color="green" onClick={createPost}>
          <AddIcon />
          Create Post
        </Button>
        <div className="spacer"></div>
      </>)}

      {!isHandheld && (<>
        <IconButton onClick={switchThme}>
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
        {user ? (
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton onClick={login}>
            <LoginIcon />
          </IconButton>
        )}
      </>)}
    </div>
  )
}

export default Toolbar