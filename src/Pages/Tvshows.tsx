import { useEffect } from "react"
import { fetchDataFromApi } from "../utils/api"

export function Tvshows() {

     const { data, isLoading } = fetchDataFromApi('/discover/tv')

     useEffect(() => {
          console.log(data)
     }, [isLoading])

     return (
          <div className="pt-[50px] flex">
          </div>
     )
}
