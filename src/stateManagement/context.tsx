import { useState, createContext, useContext, useRef } from "react"
import { ChildrenType } from "../types/type"
import { GlobalContextType } from "../types/type"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export function useGlobalContext() {
     return useContext(GlobalContext)
}

const queryClient = new QueryClient()

export function GlobalContextProvider({ children }: ChildrenType) {

     const [menuTogglerActive, setMenuTogglerActive] = useState<boolean>(false)

     const itemContainer = useRef<HTMLDivElement>(null)

     function changeMenuTogglerState() {
          setMenuTogglerActive((prevState: boolean) => {
               return !prevState
          })
     }

     function changeDateFormat(date: string): string {
          const [year, month, day] = date.split('-')
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          return `${months[parseInt(month) - 1]} ${day}, ${year}`
     }

     return (
          <GlobalContext.Provider value={{ menuTogglerActive, changeMenuTogglerState, changeDateFormat, itemContainer }}>
               <QueryClientProvider client={queryClient}>
                    {children}
               </QueryClientProvider>
          </GlobalContext.Provider>
     )
}