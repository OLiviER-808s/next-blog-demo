import { useState, useEffect } from "react"

export const useScreenWidth = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })

    setWidth(window.innerWidth)

    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  return width
}

// useEffect hook that ignores the first render
export const useMyEffect = (func: any, dep: Array<any>) => {
  const [first, setFirst] = useState(true)

  useEffect(() => {
    if (first) setFirst(false)
    else func()
  }, dep)
}
