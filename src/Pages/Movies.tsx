import { useEffect } from "react"
import { fetchDataFromApi } from "../utils/api"

export function Movies() {

     const { data, isLoading } = fetchDataFromApi('/discover/movie')

     useEffect(() => {
          console.log(data)
     }, [isLoading])

     return (
          <div className="pt-[50px] flex">

          </div>
     )
}
