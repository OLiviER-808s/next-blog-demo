import type { NextPage } from 'next'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SidebarProvider from '../lib/SidebarProvider'

const Home: NextPage = () => {
  return (
    <SidebarProvider>
      <Header></Header>
      <Sidebar></Sidebar>
    </SidebarProvider>
  )
}

export default Home
