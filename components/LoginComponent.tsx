import { useState } from "react"
import { validateEmail, validatePassword } from "../lib/validators"
import Button from "./Button"
import Textbox from "./Textbox"

const LoginComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="center">
      <form>
        <Textbox placeholder="Email" type="email" icon value={email} onChange={setEmail} validator={() => validateEmail(email)}/>

        <Textbox placeholder="Password" type="password" icon value={password} onChange={setPassword} 
        validator={() => validatePassword(password)}/>

        <Button color="blue">Login</Button>
      </form>
    </div>
  )
}

export default LoginComponent