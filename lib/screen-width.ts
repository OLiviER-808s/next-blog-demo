import { useState, useEffect } from "react"

const useScreenWidth = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log('asasas')
      setWidth(window.innerWidth)
    })

    setWidth(window.innerWidth)

    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  return width
}

export default useScreenWidth