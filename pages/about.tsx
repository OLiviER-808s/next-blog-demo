import { NextPage } from "next";
import Loader from "../components/Loader";

const About: NextPage = () => {
  return (
    <>
      <h2>About Page</h2>
      <Loader show/>
    </>
  )
}

export default About