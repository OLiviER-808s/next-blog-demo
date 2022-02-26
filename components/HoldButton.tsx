import { useRef, useEffect } from "react"

const HoldButton = (props: any) => {
  const btn: any = useRef(null)

  let interval: any;

  const updateFill = () => {
    interval = setInterval(() => {
      props.setFill((prevFill: any) => {
        if (prevFill < 100) {
          return prevFill + 1
        }
        else {
          clearInterval(interval)
          endFill()
          return prevFill
        }
      })
    }, props.speed)
  }
  
  const endFill = () => {
    btn.current.removeEventListener('mousedown', () => {})
    props.onEnd()
  }

  useEffect(() => {
    btn.current.addEventListener('mousedown', () => updateFill())

    btn.current.addEventListener('mouseup', () => {
      clearInterval(interval)
      props.setFill(0)
    })
  }, [])

  return (
    <div ref={btn}>
      { props.children }
    </div>
  )
}

export default HoldButton