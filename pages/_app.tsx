import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SidebarProvider from '../lib/SidebarProvider'
import Head from 'next/head'
import ThemeProvider from '../lib/ThemeProvider'
import AuthProvider from '../lib/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />
      </Head>

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
