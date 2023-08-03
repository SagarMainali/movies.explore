import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../../utils/api"
import { CastType } from "../../types/type"
import { image_baseUrl } from "../../utils/common"

export function CastSection({ endpoint }: { endpoint: string }) {

     const { data } = fetchDataFromApi(endpoint)

     const [castList, setCastList] = useState<CastType[]>([])

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
          <div className="flex flex-col gap-3">
               <h1 className="font-semibold text-lg">Top Cast</h1>
               <div className="flex gap-4 overflow-x-scroll category">
                    {
                         castList.map((cast: CastType) => (
                              <div className="min-w-[140px]">
                                   <img src={image_baseUrl + cast.profile_path} alt="cast" className="rounded-full h-[140px] w-full object-cover" />
                                   <h1 className="text-sm font-medium text-center">{cast.original_name}</h1>
                                   <h1 className="text-sm font-medium text-center">({cast.character})</h1>
                              </div>
                         ))
                    }
               </div>
          </div>
     )
}
