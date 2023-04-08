import Link from "next/link"
import { useContext, useEffect } from "react"
import { AuthContext } from "./AuthProvider"
import Loader from "../components/Loader"
import { useRouter } from "next/router"

const AuthCheck = ({ children, reverse }: any) => {
  const user = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (reverse && user) router.push('/') 
  }, [user])

  return (reverse && !user) || (!reverse && user) ? children : (
    <div className="center">
      {reverse ?<Loader show/> : <Link href="/signup">You must be signed in</Link>}
    </div>
  )
}

export default AuthCheck