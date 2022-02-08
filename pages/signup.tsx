import { signInWithPopup } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Card from "../components/Card";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import { Tab, TabGroup } from "../components/Tabs";
import { auth, googleProvider } from "../lib/firebase";
import GoogleIcon from '../public/icons/google.svg';

const Signup: NextPage = () => {
  const router = useRouter()

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
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