import { MovieAndShowsDetails } from "../../types/type"
import { useFetchDataFromApi } from "../../utils/api"
import { Card } from "../globalComponents/Card"
import '../../styles/hide_scrollbar.css'
import { Controller } from "../globalComponents/Controller"
import { useRef, useState, useEffect } from "react"
import { Skeleton } from "../globalComponents/Skeleton"

export function SuggestedCategory({ id, media_type, category }: { id: string | undefined, media_type: string | undefined, category: string }) {

     const endpoint = `/${media_type}/${id}/${category}`

     const { data, isLoading } = useFetchDataFromApi(endpoint)

     const category_title = category === 'similar'
          ? `Similar ${media_type === 'movie'
               ? 'Movies' : 'Tv Shows'}`
          : 'Recommendations'

     const containerRef = useRef<HTMLDivElement>(null)

     const [flexGap, setFlexGap] = useState<number>(0)

     function changeFlexGap() {
          if (window.screen.width >= 860) {
               setFlexGap(12)
          }
          else {
               setFlexGap(8)
          }
     }

     useEffect(() => {
          window.addEventListener('resize', changeFlexGap)
          changeFlexGap()
          return () => { window.removeEventListener }
     }, [])

     return (
          isLoading
               ?
               <Skeleton containerType="similarCategory" />
               :
               Array.isArray(data) && data.length > 0
               &&
               <div className="flex flex-col gap-3">
                    <h1 className="sm:text-xl text-lg font-semibold">
                         {category_title}
                    </h1>

                    <div className="relative">

                         {/* gap-[${flexGap.toString()}px] - the dynamic assignment of flex gap was sometimes working sometime not, so used static instead*/}
                         <div className='hide-scrollbar flex md:gap-[12px] gap-[8px] overflow-x-scroll' ref={containerRef}>
                              {
                                   data.map(
                                        (movieOrShow: MovieAndShowsDetails) => <Card key={movieOrShow.id} customMediaType={media_type} {...movieOrShow} />
                                   )
                              }
                         </div>

                         <Controller direction="left" forwardedRef={containerRef} gap={flexGap} />

                         <Controller direction="right" forwardedRef={containerRef} gap={flexGap} />

                    </div>
               </div>
     )
}
