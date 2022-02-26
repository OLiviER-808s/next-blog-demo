import { NextPage } from "next";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";

const About: NextPage = () => {
  return (
    <>
      <Card>
        <ProgressBar fillWidth={40} color="var(--secondary-bg-color)" fillColor="rgb(60, 78, 245)" />
      </Card>
    </>
  )
}

export default About