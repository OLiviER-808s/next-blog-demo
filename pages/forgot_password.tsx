import { sendPasswordResetEmail } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Textbox from "../components/Textbox";
import { auth } from "../lib/firebase";
import { ResetEmailToast } from "../lib/toast";
import { validateEmail } from "../lib/validators";

const ForgotPassword: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const sendResetEmail = async () => {
    const state = await validateEmail(email)

    if (state === 'valid') {
      await sendPasswordResetEmail(auth, email)
      ResetEmailToast()
      setEmail('')
    }
  }

  return (
    <div className="center">
      <Card>
        <h3>Forgot Password?</h3>

        <Textbox placeholder="Email" type="email" 
        value={email} onChange={setEmail} />

        <div className="btn-row">
          <Button color="blue">Send Reset Email</Button>
          <Button secondary onClick={() => router.push('/signup?tab=1')}>Back</Button>
        </div>
      </Card>
    </div>
  )
}

export default ForgotPassword