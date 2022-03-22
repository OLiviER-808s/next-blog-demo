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
    btn.current.removeEventListener('touchstart', () => {})
    props.onEnd()
  }

  useEffect(() => {
    btn.current.addEventListener('mousedown', () => {
      props.onStart()
      updateFill()
    })

    btn.current.addEventListener('mouseup', () => {
      clearInterval(interval)
      props.setFill(0)
    })

    btn.current.addEventListener('touchstart', () => updateFill())

    btn.current.addEventListener('touchend', () => {
      clearInterval(interval)
      props.setFill(0)
    })
  }, [])

  return (
    <div ref={btn} style={{'backgroundColor': 'inherit'}}>
      { props.children }
    </div>
  )
}

export default HoldButton