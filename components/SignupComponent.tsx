import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { auth } from "../lib/firebase"
import { validateEmail, validatePassword, validatePasswordConfirm } from "../lib/validators"
import Button from "./Button"
import Textbox from "./Textbox"

const SignupComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const router = useRouter();

  const signup = async () => {
    if (validateEmail(email) && validatePassword(password) && validatePasswordConfirm(password, passwordConfirm)) {
      await createUserWithEmailAndPassword(auth, email, password);

      router.push('/profile/set');
    }
  }

  return (
    <div className="center">
      <form onSubmit={signup}>
        <Textbox placeholder="Email" type="email" icon value={email} onChange={setEmail} 
        validator={() => validateEmail(email)}/>

        <Textbox placeholder="Password" type="password" icon value={password} onChange={setPassword} 
        validator={() => validatePassword(password)}/>

        <Textbox placeholder="Confirm Password" type="password" icon value={passwordConfirm} onChange={setPasswordConfirm}
        validator={() => validatePasswordConfirm(password, passwordConfirm)}/>

        <Button color="green" onClick={signup}>Create Account</Button>
      </form>
    </div>
  )
}

export default SignupComponent