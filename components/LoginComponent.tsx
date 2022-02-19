import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { auth } from "../lib/firebase"
import Button from "./Button"
import Textbox from "./Textbox"

const LoginComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const router = useRouter()

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setError('')
      router.push('/')
    } catch (err) {
      setError('Email or Password is incorrect')
    }
  }

  return (
    <div className="center">
      <form onSubmit={login}>
        <Textbox placeholder="Email" type="email" value={email} onChange={setEmail} 
        validationState={!!error ? 'error' : 'neutral'}/>

        <Textbox placeholder="Password" type="password" value={password} onChange={setPassword} 
        validationState={!!error ? 'error' : 'neutral'}/>

        <p className="error">{ error }</p>

        <div className="btn-row">
          <Button color="blue" onClick={login}>Login</Button>
          <Button secondary>Forgot Passowrd?</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginComponent