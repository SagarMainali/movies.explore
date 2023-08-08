import { ChildrenType } from "../../types/type"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const ScrollToTop = ({ children }: ChildrenType) => {
     const location = useLocation()
     useEffect(() => {
          window.scrollTo(0, 0)
     }, [location])
     return <>{children}</>
}
