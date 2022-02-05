import { NextPage } from "next";
import Button from "../components/Button";
import Card from "../components/Card";
import { Tab, TabGroup } from "../components/Tabs";

const Signup: NextPage = () => {
  return (
    <div style={{'display': 'flex', 'justifyContent': 'center'}}>
      <Card>
        <TabGroup name="tabs">
          <Tab id='signup' label="Signup">
            signup
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