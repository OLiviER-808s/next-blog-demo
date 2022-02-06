import { NextPage } from "next";
import Button from "../components/Button";
import Card from "../components/Card";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";
import { Tab, TabGroup } from "../components/Tabs";
import GoogleIcon from '../public/icons/google.svg';

const Signup: NextPage = () => {
  return (
    <div className="center">
      <div>
        <div className="center" style={{'marginBottom': '2em'}}>
          <Button color="basic">
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