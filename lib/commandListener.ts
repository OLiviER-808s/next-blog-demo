import { useEffect, useState } from "react"

export const useCommandListener = (command: string) => {
  const [state, setState] = useState(false)

  useEffect(() => {
    document.addEventListener('click', () => {
      const q = document.queryCommandState(command)
      setState(q)
    })

    return document.removeEventListener('click', () => {})
  }, [])

  return state ? 'selected' : ''
}