import { createContext, useState } from "react"

export const SidebarOpenContext = createContext(false)
export const SidebarUpdateContext = createContext((v: boolean) => {})

const SidebarProvider = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarOpenContext.Provider value={open}>
      <SidebarUpdateContext.Provider value={setOpen}>
        { props.children }
      </SidebarUpdateContext.Provider>
    </SidebarOpenContext.Provider>
  )
}

export default SidebarProvider