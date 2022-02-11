import { createContext } from "react"
import { useUserData } from "./auth";

const def: any = {}
export const AuthContext = createContext(def);

const AuthProvider = (props: any) => {
  const user = useUserData();

  return (
    <AuthContext.Provider value={user}>
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthProvider