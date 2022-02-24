import { createUserWithEmailAndPassword } from "firebase/auth"
import debounce from "lodash.debounce"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { auth, db } from "../lib/firebase"
import { validatePassword, validatePasswordConfirm } from "../lib/validators"
import Button from "./Button"
import Textbox from "./Textbox"
import { collection, getDocs, query, where } from "firebase/firestore";

const SignupComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [emailState, setEmailState] = useState('neutral')

  const router = useRouter();

  useEffect(() => {
    checkEmail(email)
  }, [email])

  const checkEmail = useCallback(
    debounce(async (email: string) => {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (!email.match(re)) {
        setEmailState('neutral')
      }
      else {
        const ref = collection(db, 'users')
        const q = query(ref, where('email', '==', email))
        const snap = await getDocs(q)
        const exists = snap.size > 0
        setEmailState(exists ? 'error' : 'valid')
      }
    }, 500),
    []
  )

  const signup = async () => {
    const valid = validatePassword(password) === 'valid'
      && validatePasswordConfirm(password, passwordConfirm) === 'valid'
      && emailState === 'valid'

    if (valid) {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/profile/set')
    }
  }

  return (
    <div className="center">
      <form onSubmit={signup}>
        <Textbox placeholder="Email" type="email" icon value={email} onChange={setEmail} 
        validationState={emailState} error_msg="Email is already being used." />

        <Textbox placeholder="Password" type="password" icon value={password} onChange={setPassword} 
        validationState={validatePassword(password)} />

        <Textbox placeholder="Confirm Password" type="password" icon value={passwordConfirm} onChange={setPasswordConfirm}
        validationState={validatePasswordConfirm(password, passwordConfirm)}/>

        <Button color="green" onClick={signup}>Create Account</Button>
      </form>
    </div>
  )
}

export default SignupComponent