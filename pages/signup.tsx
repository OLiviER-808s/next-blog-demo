import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../components/Button";
import Card from "../components/Card";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import { Tab, TabGroup } from "../components/Tabs";
import { auth, db, googleProvider } from "../lib/firebase";
import GoogleIcon from '../public/icons/google.svg';

const Signup: NextPage = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    const ref = doc(db, `users/${user?.uid}`);
    await setDoc(ref, {
      username: user?.displayName,
      email: user?.email,
      photo: user?.photoURL
    }, { merge: true });
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
  )
}

export default Signup