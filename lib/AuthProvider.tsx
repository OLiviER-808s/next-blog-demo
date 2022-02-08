import { createContext } from "react"
import { useUserData } from "./auth";

export const AuthContext = createContext({});

const AuthProvider = (props: any) => {
  const user = useUserData();

  return (
    <AuthContext.Provider value={user}>
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthProvider