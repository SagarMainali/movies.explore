import { useEffect, useState, useRef } from "react"
import { useFetchDataFromApi } from "../../utils/api"
import { CastType } from "../../types/type"
import { image_baseUrl } from "../../utils/common"

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

     const castContainer = useRef<HTMLDivElement>(null)

     function slider(direction: string) {
          const container = castContainer.current

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
          castList && castList.length > 0
          &&
          <div className="flex flex-col gap-3">
               <h1 className="font-semibold text-lg">Top Cast</h1>

               <div className="relative">

                    <svg className="h-[25px] absolute max-md:hidden top-[50%] left-2 -translate-y-[50%] z-10 
                              fill-primary-dark bg-slate-100 rounded-full cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         onClick={() => slider('left')}>
                         <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
                    </svg>

                    <svg className="h-[25px] absolute max-md:hidden top-[50%] right-2 -translate-y-[50%] z-10 
                              fill-primary-dark bg-slate-100 rounded-full cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         onClick={() => slider('right')}>
                         <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
                    </svg>

                         <div className="flex md:gap-[12px] gap-[8px] overflow-x-scroll hide-scrollbar" ref={ castContainer}>
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
               </div>
          </div>
     )
}
