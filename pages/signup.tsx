import { NextPage } from "next";
import Button from "../components/Button";
import Card from "../components/Card";
import SignupComponent from "../components/SignupComponent";
import { Tab, TabGroup } from "../components/Tabs";

const Signup: NextPage = () => {
  return (
    <div className="center">
      <Card>
        <TabGroup name="tabs">
          <Tab id='signup' label="Signup">
            <SignupComponent></SignupComponent>
          </Tab>
          <Tab id="login" label="Login">
            login
          </Tab>
        </TabGroup>
      </Card>
    </div>
  )
}

export default Signup