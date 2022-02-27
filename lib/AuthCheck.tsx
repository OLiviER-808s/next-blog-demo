import Link from "next/link"
import { useContext } from "react"
import { AuthContext } from "./AuthProvider"

const AuthCheck = ({ children }: any) => {
  const user = useContext(AuthContext)

  return user ? children : <div className="center"><Link href="/signup">You must be signed in</Link></div>
}

export default AuthCheck