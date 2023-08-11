import { MovieAndShowsDetails } from "../../types/type"
import { useFetchDataFromApi } from "../../utils/api"
import { Card } from "../globalComponents/Card"
import '../../styles/hide_scrollbar.css'
import { Controller } from "../globalComponents/Controller"
import { useRef } from "react"

export function SuggestedCategory({ id, media_type, category }: { id: string | undefined, media_type: string | undefined, category: string }) {

     const endpoint = `/${media_type}/${id}/${category}`

     const { data } = useFetchDataFromApi(endpoint)

     const category_title = category === 'similar'
          ? `Similar ${media_type === 'movie'
               ? 'Movies' : 'Tv Shows'}`
          : 'Recommendations'

     const containerRef = useRef<HTMLDivElement>(null)

     return (
          Array.isArray(data) && data.length > 0
          &&
          <div className="flex flex-col gap-3">
               <h1 className="sm:text-xl text-lg font-semibold">
                    {category_title}
               </h1>

               <div className="relative">

                    <div className="hide-scrollbar flex md:gap-[12px] gap-[8px] overflow-x-scroll" ref={containerRef}>
                         {
                              data.map(
                                   (movieOrShow: MovieAndShowsDetails) => <Card key={movieOrShow.id} customMediaType={media_type} {...movieOrShow} />
                              )
                         }
                    </div>

                    <Controller direction="left" forwardedRef={containerRef} />

                    <Controller direction="right" forwardedRef={containerRef} />

               </div>

          </div>
     )
}
