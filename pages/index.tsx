import type { NextPage } from 'next'
import Toolbar from '../components/Toolbar'
import useScreenWidth from '../lib/screen-width'

const Home: NextPage = () => {
  const width = useScreenWidth()

  return (
    <>
      <Toolbar></Toolbar>
      <p>{width}</p>
    </>
  )
}

export default Home
