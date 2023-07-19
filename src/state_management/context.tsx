import { useState, createContext, useContext } from "react"
import { ChildrenType } from "../types/type"
import { GlobalContextType } from "../types/type"

const GlobalContext = createContext({} as GlobalContextType)

export function useGlobalContext() {
     return useContext(GlobalContext)
}

export function GlobalContextProvider({ children }: ChildrenType) {

     const [menuTogglerActive, setMenuTogglerActive] = useState<boolean>(false)

     function changeMenuTogglerState() {
          setMenuTogglerActive((prevState: boolean) => {
               return !prevState
          })
     }

     return (
          <GlobalContext.Provider value={{ menuTogglerActive, changeMenuTogglerState }}>
               {children}
          </GlobalContext.Provider>
     )
}