import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Card from "../components/Card";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import { Tab, TabGroup } from "../components/Tabs";
import { auth, db, googleProvider } from "../lib/firebase";
import { validateUsername } from "../lib/validators";
import GoogleIcon from '../public/icons/google.svg';

const Signup: NextPage = () => {
  const router = useRouter()

  const makeUsername = async (username: any): Promise<string> => {
    if (await validateUsername(username) === 'valid') {
      return username
    }
    else {
      let code: string = '';
      for (let i = 0; i < 4; i++) {
        code += String(Math.floor(Math.random() * 10))
      }
      return makeUsername(`${username}${code}`)
    }
  }

  const loginWithGoogle = async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    const u = credential.user

    const ref = doc(db, `users/${u.uid}`);
    const d = await getDoc(ref)

    if (!d.exists()) {
      const batch = writeBatch(db)

      const username = await makeUsername(u.displayName)
      const usernameRef = doc(db, `usernames/${username}`)

      batch.set(ref, {
        username: username,
        email: u.email,
        photo: u.photoURL
      }, { merge: true });
      batch.set(usernameRef, { uid: u.uid })

      await batch.commit()
    }
    router.push('/');
  }

  return (
    <div className="center">
      <div>
        <div className="center" style={{'marginBottom': '2em'}}>
          <Button color="basic" onClick={loginWithGoogle}>
            <GoogleIcon />
            Login with Google
          </Button>
        </div>


        <div style={{'width': '100%', 'maxWidth': '430px'}}>
          <Card>
            <TabGroup name="tabs">
              <Tab id='signup' label="Signup">
                <SignupComponent />
              </Tab>
              <Tab id="login" label="Login">
                <LoginComponent />
              </Tab>
            </TabGroup>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Signup