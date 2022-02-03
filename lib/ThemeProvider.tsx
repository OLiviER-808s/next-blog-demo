import { createContext, useEffect, useState } from "react"

export const ThemeUsedContext = createContext({})
export const ThemeUpdateContext = createContext(() => {})

const ThemeProvider = (props: any) => {
  const [theme, switchTheme] = useState('light');

  useEffect(() => switchTheme(localStorage.getItem('theme') || 'light'), []);
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.style.setProperty('--text-color', 'black');
      document.documentElement.style.setProperty('--primary-bg-color', 'rgb(230, 230, 230)');
      document.documentElement.style.setProperty('--secondary-bg-color', 'rgb(202, 202, 202)');
    }
    else if (theme === 'dark') {
      document.documentElement.style.setProperty('--text-color', 'white')
      document.documentElement.style.setProperty('--primary-bg-color', '#474747')
      document.documentElement.style.setProperty('--secondary-bg-color', '#2b2b2b')
    }
  }, [theme])

  return (
    <ThemeUsedContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={() => switchTheme(theme === 'light' ? 'dark' : 'light')}>
        { props.children }
      </ThemeUpdateContext.Provider>
    </ThemeUsedContext.Provider>
  )
}

export default ThemeProvider