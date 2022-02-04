import type { NextPage } from 'next'
import { useContext } from 'react'
import { ThemeUpdateContext } from '../lib/ThemeProvider'

const Home: NextPage = () => {
  const switchTheme = useContext(ThemeUpdateContext)

  return (
    <button onClick={switchTheme}>switch theme</button>
  )
}

export default Home
