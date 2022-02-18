import type { NextPage } from 'next'
import { useState } from 'react'
import Toolbar from '../components/Toolbar'
import useScreenWidth from '../lib/screen-width'

const Home: NextPage = () => {
  const width = useScreenWidth()
  const [error, setError] = useState(false)

  return (
    <>
      <Toolbar></Toolbar>
      <p>{width}</p>
      <p className={error ? 'error' : ''}>text</p>
      <button onClick={() => setError(!error)}>change color</button>
    </>
  )
}

export default Home
