import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../lib/firebase"
import { validateEmail, validatePassword } from "../lib/validators"
import Button from "./Button"
import Textbox from "./Textbox"

const LoginComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      await signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <div className="center">
      <form onSubmit={login}>
        <Textbox placeholder="Email" type="email" icon value={email} onChange={setEmail} validator={() => validateEmail(email)}/>

        <Textbox placeholder="Password" type="password" icon value={password} onChange={setPassword} 
        validator={() => validatePassword(password)}/>

        <div className="btn-row">
          <Button color="blue" onClick={login}>Login</Button>
          <Button secondary>Forgot Passowrd?</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginComponent