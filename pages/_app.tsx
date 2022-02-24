import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SidebarProvider from '../lib/SidebarProvider'
import ThemeProvider from '../lib/ThemeProvider'
import AuthProvider from '../lib/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <SidebarProvider>
            <Header></Header>
            <Sidebar></Sidebar>
            
            <div className='page'>
              <div className="page-content">
                <Component {...pageProps} />
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
