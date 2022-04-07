import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Loader from "./Loader"

const LoadingScreen = ({ children }: any) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true))
    router.events.on('routeChangeComplete', () => setLoading(false))
    router.events.on('routeChangeError', () => setLoading(false))
  }, [])

  return loading ? 
  (<div className="center">
    <div>
      <Loader show />
    </div>
  </div>) : children
}

export default LoadingScreen