import { createUserWithEmailAndPassword } from "firebase/auth"
import debounce from "lodash.debounce"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { auth } from "../lib/firebase"
import { validateEmail, validatePassword, validatePasswordConfirm } from "../lib/validators"
import Button from "./Button"
import Textbox from "./Textbox"
import Loader from "./Loader"

const SignupComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [emailState, setEmailState] = useState('neutral')

  const [loading, setLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {
    checkEmail(email)
  }, [email])

  const checkEmail = useCallback(
    debounce(async (email: string) => {
      const state = await validateEmail(email)
      setEmailState(state)
    }, 500),
    []
  )

  const signup = async () => {
    const valid = validatePassword(password) === 'valid'
      && validatePasswordConfirm(password, passwordConfirm) === 'valid'
      && emailState === 'valid'

    if (valid) {
      setLoading(true)
      
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/profile/set')

      setLoading(false)
    }
  }

  return (
    <div className="center">
      {loading ? (
        <Loader show />
      ) : (
        <form onSubmit={signup}>
          <Textbox placeholder="Email" type="email" icon value={email} onChange={setEmail} 
          validationState={emailState} error_msg="Email is already being used." />

          <Textbox placeholder="Password" type="password" icon value={password} onChange={setPassword} 
          validationState={validatePassword(password)} />

          <Textbox placeholder="Confirm Password" type="password" icon value={passwordConfirm} onChange={setPasswordConfirm}
          validationState={validatePasswordConfirm(password, passwordConfirm)}/>

          <Button color="green" onClick={signup}>Create Account</Button>
        </form>
      )}
    </div>
  )
}

export default SignupComponent