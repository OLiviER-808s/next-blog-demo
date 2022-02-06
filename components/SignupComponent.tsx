import { useState } from "react"
import { validateEmail, validatePassword, validatePasswordConfirm } from "../lib/validators"
import Button from "./Button"
import Textbox from "./Textbox"

const SignupComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <div className="center">
      <form>
        <Textbox placeholder="Email" type="email" icon value={email} onChange={setEmail} validator={() => validateEmail(email)}/>

        <Textbox placeholder="Password" type="password" icon value={password} onChange={setPassword} 
        validator={() => validatePassword(password)}/>

        <Textbox placeholder="Confirm Password" type="password" icon value={passwordConfirm} onChange={setPasswordConfirm}
        validator={() => validatePasswordConfirm(password, passwordConfirm)}/>

        <Button color="green">Create Account</Button>
      </form>
    </div>
  )
}

export default SignupComponent