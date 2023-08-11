import { useEffect, useState, useRef } from "react"
import { useFetchDataFromApi } from "../../utils/api"
import { CastType } from "../../types/type"
import { image_baseUrl } from "../../utils/common"
import { Controller } from "../globalComponents/Controller"

export function CastSection({ endpoint }: { endpoint: string }) {

     const { data } = useFetchDataFromApi(endpoint)

     const [castList, setCastList] = useState<CastType[]>([] as CastType[])

     useEffect(() => {
          if (data && Array.isArray(data)) {
               if (data.length > 15) {
                    let i = 0
                    const reducedData = []
                    for (i; i < 15; i++) {
                         reducedData.push(data[i])
                    }
                    setCastList(reducedData)
               }
               else {
                    setCastList(data)
               }
          }
     }, [data])

     const containerRef = useRef<HTMLDivElement>(null)

     return (
          castList && castList.length > 0
          &&
          <div className="flex flex-col gap-3">
               <h1 className="font-semibold text-lg">Top Cast</h1>

               <div className="relative">

                    <div className="flex md:gap-[12px] gap-[8px] overflow-x-scroll hide-scrollbar" ref={containerRef}>
                         {
                              castList?.map((cast: CastType) => (
                                   <div key={cast.id} className="md:min-w-[150px] min-w-[120px]">
                                        <div className="md:h-[150px] h-[120px] rounded-full border-2 border-slate-300 p-[2px]">
                                             <img
                                                  src={cast.profile_path
                                                       ? image_baseUrl + cast.profile_path
                                                       : cast.gender === 1
                                                            ? '/female-avatar.png'
                                                            : '/male-avatar.png'}
                                                  alt="cast"
                                                  className="rounded-full h-full w-full object-cover"
                                             />
                                        </div>
                                        <h1 className="text-sm font-medium text-center">{cast.original_name}</h1>
                                        {cast.character && <h1 className="text-xs font-medium text-center">({cast.character})</h1>}
                                   </div>
                              ))
                         }
                    </div>

                    <Controller direction="left" forwardedRef={containerRef} />

                    <Controller direction="right" forwardedRef={containerRef} />

               </div>
          </div>
     )
}
