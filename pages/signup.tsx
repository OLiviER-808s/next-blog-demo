import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Card from "../components/Card";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import { Tab, TabGroup } from "../components/Tabs";
import { auth, db, googleProvider } from "../lib/firebase";
import GoogleIcon from '../public/icons/google.svg';

const Signup: NextPage = () => {
  const router = useRouter()

  const loginWithGoogle = async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    const u = credential.user

    const ref = doc(db, `users/${u.uid}`);
    const d = await getDoc(ref)

    if (!d.exists()) {
      await setDoc(ref, {
        username: u.displayName,
        email: u.email,
        photo: u.photoURL
      }, { merge: true });
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