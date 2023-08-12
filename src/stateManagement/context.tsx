import { useState, createContext, useContext } from "react"
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

     function slider(direction: string, forwardedRef: React.RefObject<HTMLDivElement>) {
          const container = forwardedRef.current

          if (!container) {
               return // return early if the container is not available
          }

          const itemContainerWidth = container.offsetWidth
          const itemContainerScrollPosition = container.scrollLeft
          let pxToScroll = 0

          if (direction === 'right') {
               pxToScroll = itemContainerScrollPosition + itemContainerWidth
          }
          else {
               pxToScroll = itemContainerScrollPosition - itemContainerWidth
          }

          container.scrollTo({
               left: pxToScroll,
               behavior: 'smooth'
          })
     }

     return (
          <GlobalContext.Provider value={{ menuTogglerActive, changeMenuTogglerState, changeDateFormat, slider }}>
               <QueryClientProvider client={queryClient}>
                    {children}
               </QueryClientProvider>
          </GlobalContext.Provider>
     )
}