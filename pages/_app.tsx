import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SidebarProvider from '../lib/SidebarProvider'
import ThemeProvider from '../lib/ThemeProvider'
import AuthProvider from '../lib/AuthProvider'
import { Toaster } from 'react-hot-toast'
import LoadingScreen from '../components/LoadingScreen'

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
                <LoadingScreen>
                  <Component {...pageProps} />
                </LoadingScreen>
              </div>
            </div>

            <Toaster position="bottom-center" reverseOrder={false} />
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
