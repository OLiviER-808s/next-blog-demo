import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEmailCheck } from "../lib/auth"
import { auth } from "../lib/firebase"
import { validateEmail, validatePassword, validatePasswordConfirm } from "../lib/validators"
import Button from "./Button"
import Textbox from "./Textbox"

const SignupComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [error, setError] = useState(false)

  const router = useRouter();

  const signup = async () => {
    if (validateEmail(email) && validatePassword(password) && validatePasswordConfirm(password, passwordConfirm)) {
      const EmailAccepted = await useEmailCheck(email)

      if (EmailAccepted) {
        await createUserWithEmailAndPassword(auth, email, password)
        router.push('/profile/set')
      }
      else setError(true)
    }
  }

  return (
    <div className="center">
      <form onSubmit={signup}>
        <Textbox placeholder="Email" type="email" icon value={email} onChange={setEmail} 
        validator={() => validateEmail(email)} error={error}/>

        <Textbox placeholder="Password" type="password" icon value={password} onChange={setPassword} 
        validator={() => validatePassword(password)}/>

        <Textbox placeholder="Confirm Password" type="password" icon value={passwordConfirm} onChange={setPasswordConfirm}
        validator={() => validatePasswordConfirm(password, passwordConfirm)}/>

        {error && <p className="error">That email is already being used. Try entering a different one</p>}

        <Button color="green" onClick={signup}>Create Account</Button>
      </form>
    </div>
  )
}

export default SignupComponent