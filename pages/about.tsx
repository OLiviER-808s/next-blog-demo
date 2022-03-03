import { NextPage } from "next";
import { useState } from "react";
import Card from "../components/Card";
import CropImage from "../components/CropImage";

const About: NextPage = () => {
  const [image, setImage]: any = useState(null)

  return (
    <Card>
      <CropImage src="default profile pic.jpg" onEnd={setImage}></CropImage>
      <img src={image} />
    </Card>
  )
}

export default About