import { createContext, useEffect, useState } from "react"

export const ThemeUsedContext = createContext({})
export const ThemeUpdateContext = createContext(() => {})

const ThemeProvider = (props: any) => {
  const [theme, switchTheme] = useState('light');

  useEffect(() => switchTheme(localStorage.getItem('theme') || 'light'), []);
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.style.setProperty('--text-color', '#000000');
      document.documentElement.style.setProperty('--primary-bg-color', '#e6e6e6');
      document.documentElement.style.setProperty('--secondary-bg-color', '#cacaca');
      document.documentElement.style.setProperty('--btn-color', '#bfbfbf');
      document.documentElement.style.setProperty('--dropdown-bg-color', '#303030');
      document.documentElement.style.setProperty('--dropdown-text-color', '#ffffff');
      document.documentElement.style.setProperty('--border-color', '#999999');
    }
    else if (theme === 'dark') {
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--primary-bg-color', '#303030');
      document.documentElement.style.setProperty('--secondary-bg-color', '#424242');
      document.documentElement.style.setProperty('--btn-color', '#2e2e2e');
      document.documentElement.style.setProperty('--dropdown-bg-color', '#e6e6e6');
      document.documentElement.style.setProperty('--dropdown-text-color', '#000000');
      document.documentElement.style.setProperty('--border-color', '#5a5a5a');
    }
  }, [theme])

  return (
    <ThemeUsedContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={() => {
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
        switchTheme(theme === 'light' ? 'dark' : 'light');
      }}>
        { props.children }
      </ThemeUpdateContext.Provider>
    </ThemeUsedContext.Provider>
  )
}

export default ThemeProvider