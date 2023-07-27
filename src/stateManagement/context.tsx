import { useState, createContext, useContext } from "react"
import { ChildrenType } from "../types/type"
import { GlobalContextType } from "../types/type"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const GlobalContext = createContext({} as GlobalContextType)

export function useGlobalContext() {
     return useContext(GlobalContext)
}

const queryClient = new QueryClient()

export function GlobalContextProvider({ children }: ChildrenType) {

     const [menuTogglerActive, setMenuTogglerActive] = useState<boolean>(false)

     function changeMenuTogglerState() {
          setMenuTogglerActive((prevState: boolean) => {
               return !prevState
          })
     }

     return (
          <GlobalContext.Provider value={{ menuTogglerActive, changeMenuTogglerState }}>
               <QueryClientProvider client={queryClient}>
                    {children}
               </QueryClientProvider>
          </GlobalContext.Provider>
     )
}