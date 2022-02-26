import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";

const About: NextPage = () => {
  const btn: any = useRef(null)
  const [fill, setFill] = useState(0)

  let interval: any;

  const updateFill = () => {
    interval = setInterval(() => {
      setFill(prevFill => {
        if (prevFill < 100) {
          return prevFill + 1
        }
        else {
          endFill()
          clearInterval(interval)
          return prevFill
        }
      })
    }, 20)
  }
  
  const endFill = () => {
    btn.current.removeEventListener('mousedown', () => console.log('fill end'))
  }

  useEffect(() => {
    btn.current.addEventListener('mousedown', () => updateFill())

    btn.current.addEventListener('mouseup', () => {
      clearInterval(interval)
      setFill(0)
    })
  }, [])

  return (
    <>
      <Card>
        <ProgressBar fillWidth={fill} color="var(--secondary-bg-color)" fillColor="rgb(60, 78, 245)" />
        <button ref={btn}>hold</button>
        <button onClick={() => setFill(0)}>reset</button>
      </Card>
    </>
  )
}

export default About