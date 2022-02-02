import { createContext, useState } from "react"

export const SidebarOpenContext = createContext(false)
export const SidebarUpdateContext = createContext(() => {})

const SidebarProvider = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarOpenContext.Provider value={open}>
      <SidebarUpdateContext.Provider value={() => setOpen(!open)}>
        { props.children }
      </SidebarUpdateContext.Provider>
    </SidebarOpenContext.Provider>
  )
}

export default SidebarProvider