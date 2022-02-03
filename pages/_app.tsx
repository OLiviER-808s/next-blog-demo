import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SidebarProvider from '../lib/SidebarProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <Header></Header>
      <Sidebar></Sidebar>
      
      <div className='page'>
        <div className="page-content">
          <Component {...pageProps} />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default MyApp
