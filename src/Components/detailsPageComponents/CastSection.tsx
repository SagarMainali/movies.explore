import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../../utils/api"
import { CastType } from "../../types/type"

export function CastSection({ endpoint }: { endpoint: string }) {

     const { data } = fetchDataFromApi(endpoint)

     const [castList, setCastList] = useState<CastType[]>()

     useEffect(() => {
          if (data && Array.isArray(data)) {
               let i = 0
               const reducedData = []
               for (i; i < 15; i++) {
                    reducedData.push(data[i])
               }
               setCastList(reducedData)
          }
     }, [data])

     return (
          castList && castList.length > 0 &&
          <div>
               <h1>Top Cast</h1>
               <div className="flex gap-3">

               </div>
          </div>
     )
}
